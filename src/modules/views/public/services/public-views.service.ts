import { Injectable } from '@nestjs/common';

@Injectable()
export class PublicViewsService {
  handleMovieScheduleViewData() {
    return {
      movies: [
        {
          id: 1,
          name: 'Barbie',
          imageUrl:
            'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 2,
          name: 'Oppenheimer',
          imageUrl:
            'https://www.infobae.com/new-resizer/wJf5_q6HZudWLt0ZNPo-ryV0O2s=/992x1488/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/H2DVBWCFAZGYDFWWN4TEASWRZI.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 3,
          name: 'Top Gun: Maverick',
          imageUrl:
            'https://es.web.img2.acsta.net/pictures/22/03/29/15/57/1533124.jpg',
          isPremiere: true,
          showRibbon: false,
        },
        {
          id: 1,
          name: 'Barbie',
          imageUrl:
            'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 2,
          name: 'Oppenheimer',
          imageUrl:
            'https://www.infobae.com/new-resizer/wJf5_q6HZudWLt0ZNPo-ryV0O2s=/992x1488/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/H2DVBWCFAZGYDFWWN4TEASWRZI.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 3,
          name: 'Top Gun: Maverick',
          imageUrl:
            'https://es.web.img2.acsta.net/pictures/22/03/29/15/57/1533124.jpg',
          isPremiere: true,
          showRibbon: false,
        },
        {
          id: 1,
          name: 'Barbie',
          imageUrl:
            'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 2,
          name: 'Oppenheimer',
          imageUrl:
            'https://www.infobae.com/new-resizer/wJf5_q6HZudWLt0ZNPo-ryV0O2s=/992x1488/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/H2DVBWCFAZGYDFWWN4TEASWRZI.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 3,
          name: 'Top Gun: Maverick',
          imageUrl:
            'https://es.web.img2.acsta.net/pictures/22/03/29/15/57/1533124.jpg',
          isPremiere: true,
          showRibbon: false,
        },
        {
          id: 1,
          name: 'Barbie',
          imageUrl:
            'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 2,
          name: 'Oppenheimer',
          imageUrl:
            'https://www.infobae.com/new-resizer/wJf5_q6HZudWLt0ZNPo-ryV0O2s=/992x1488/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/H2DVBWCFAZGYDFWWN4TEASWRZI.jpg',
          isPremiere: true,
          showRibbon: true,
        },
        {
          id: 3,
          name: 'Top Gun: Maverick',
          imageUrl:
            'https://es.web.img2.acsta.net/pictures/22/03/29/15/57/1533124.jpg',
          isPremiere: true,
          showRibbon: false,
        },
      ],
    };
  }

  handleRoomTypesViewData() {
    return {
      roomTypes: [
        {
          id: 1,
          name: 'Sala normal',
          unitPrice: 1000,
        },
        {
          id: 2,
          name: 'Sala 3D',
          unitPrice: 1500,
        },
        {
          id: 3,
          name: 'Sala 4D',
          unitPrice: 2000,
        },
        {
          id: 4,
          name: 'Monster screen',
          unitPrice: 2000,
        },
      ],
    };
  }
}
