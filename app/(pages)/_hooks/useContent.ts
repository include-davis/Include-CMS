'use client';
import { useState, useEffect } from 'react';

export default function useContent(_: string, __: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ [_: string]: any }>({});

  useEffect(() => {
    const fetchContent = async () => {
      setData({
        Title: 'This is soooo cool am I right?',
        Date: '00-00-0000',
        Description: '<p>I mean just look at this</p>',
        'Photo Gallery': [
          {
            name: 'IMG_6182.JPEG',
            size: 4242899,
            file: 'blob:http://localhost:3000/f2b44879-e754-429b-b177-e986df242a06',
            onRemote: false,
          },
        ],
        'Message for Groom': '<p>I loveeee this code</p>',
        'Message for Bride': '<p>I loveeee this code even more</p>',
        'Blooper Photos': [
          {
            name: 'IMG_0286 2.JPG',
            size: 1613024,
            file: 'blob:http://localhost:3000/b8ee1f59-6a64-4172-96b0-5b54aef430b4',
            onRemote: false,
          },
        ],
      });
      setLoading(false);
    };

    fetchContent();
  }, []);

  return { loading, data };
}
