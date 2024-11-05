class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keywords = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keywords });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const category = queryCopy?.category;
    const parttype = queryCopy?.parttype;
    const brand = queryCopy?.manufacturer;
    const removeFields = ['keyword', 'category', 'parttype', 'limit', 'page', 'model_no', 'part_number','manufacturer'];
    removeFields.forEach((key) => delete queryCopy[key]);

    let output = {};
    let prop = '';

    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split('[')[0];
        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = queryCopy[key];
      }
    }

    this.query = this.query
      .find(output).where('is_variant').equals(true)
      .populate({
        path: 'manufacturer',
        match: { slug: brand || { $exists: true } },
      })
      .populate({
        path: 'category',
        match: { slug: category || { $exists: true } },
      })
      .populate({
        path: 'parttype',
        match: { slug: parttype || { $exists: true } },
      })

    return this;
  }
}

export default APIFilters;
