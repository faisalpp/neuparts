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
    const removeFields = ['keyword', 'category', 'limit', 'page'];
    removeFields.forEach((key) => delete queryCopy[key]);
    let output = {};
    let prop = '';

    for (let key in queryCopy) {
      console.log('key', key);

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

    console.log(category);

    this.query = this.query.find(output).populate({
      path: 'category',
      match: { slug: category ? category : { $exists: true } }, // Match the category's slug
    });
    return this;
  }

  pagination(resPerPage) {
    const currntPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currntPage - 1);
    this.query = this.query.skip(skip).limit(resPerPage);
    return this;
  }
}

export default APIFilters;
