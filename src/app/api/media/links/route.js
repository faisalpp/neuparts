import Media from '@/models/media';
import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import { GetYoutubeCode } from '@/utils/index';

export async function POST(request) {
  await connect();

  const { url } = await request.json();
  if (url === '') {
    return NextResponse.json({ message: 'Url is required!', success: false }, { status: 403 });
  }

  const videoCode = GetYoutubeCode(url);

  if (!videoCode) {
    return NextResponse.json({ message: 'Invalid youtube url!', success: false }, { status: 403 });
  }

  const embedUrl = 'https://www.youtube.com/embed/' + videoCode;
  const thumbnail = 'http://i3.ytimg.com/vi/' + videoCode + '/hqdefault.jpg';

  try {
    // Create media in db
    const isCreated = await Media.create({
      name: 'youtube',
      url: embedUrl,
      alt: 'youtube',
      type: 'embed',
      thumbnail: thumbnail,
    });

    if (isCreated) {
      return NextResponse.json({ message: 'Url saved successfully!', success: true }, { status: 200 });
    }
    return NextResponse.json({ message: 'Url not saved!', success: false }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error!', success: false });
  }
}
