import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import Media from '@/models/media';
import { uploadFile, deleteFiles } from '@/services/aws.js';

export async function POST(request) {
  try {
    await connect();

    // Get files from formData
    const formData = await request.formData();

    // Get file and prepare for upload
    const file = formData.get('file');
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileAlt = fileName.split('.')[0];
    const fileType = fileName.split('.')[1];
    // Upload single media file
    let URL = '';
    try {
      const { resp, url } = await uploadFile({ name: fileName, data: buffer });
      const httpStatusCode = resp.$metadata.httpStatusCode;
      if (httpStatusCode !== 200) {
        return NextResponse.json({ message: 'AWS Request Failed!', success: false }, { status: 500 });
      }
      URL = url;
    } catch (error) {
      return NextResponse.json({ message: 'AWS Request Failed!', error: error.message, success: false }, { status: 500 });
    }

    if (URL === '') {
      return NextResponse.json({ message: 'AWS Request Failed!', success: false }, { status: 500 });
    }

    // Create media in db
    const isCreated = await Media.create({
      name: fileAlt,
      url: URL,
      alt: fileAlt,
      type: fileType,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Media Uploaded!', success: true }, { status: 200 });
    }

    return NextResponse.json({ message: 'Media Upload Failed!', success: false }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message, success: false }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connect();
    const { _id } = await request.json();
    if (!_id) {
      return NextResponse.json({ message: 'Media id is required!', success: false }, { status: 400 });
    }

    //find is media exist
    let getMedia;
    try {
      getMedia = await Media.findById(_id);
    } catch (error) {
      return NextResponse.json({ message: 'Something went wrong!', error: error, success: false }, { status: 500 });
    }

    if (!getMedia) {
      return NextResponse.json({ message: 'Media not found!', success: false }, { status: 404 });
    }

    // delete from amazon
    if (getMedia.type != 'embed') {
      const { resp } = await deleteFiles(getMedia.url);
      if (resp.$metadata.httpStatusCode != 204) {
        return NextResponse.json({ message: 'Aws Media Delete Failed!', success: false }, { status: 500 });
      }
    }

    try {
      const isDeleted = await Media.findByIdAndDelete(_id);
      if (isDeleted) {
        return NextResponse.json({ message: 'Media Deleted!', success: true }, { status: 200 });
      }
      return NextResponse.json({ message: 'Media Delete Failed!', success: false }, { status: 404 });
    } catch (error) {
      return NextResponse.json({ message: 'Media Delete Failed!', success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Media Delete Failed!', error: error, success: false }, { status: 500 });
  }
}
