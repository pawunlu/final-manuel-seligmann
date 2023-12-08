import { Factory, Seeder } from 'typeorm-seeding';
import { DataSource } from 'typeorm';
import {
  Language,
  Movie,
  Reservation,
  Room,
  RoomSeat,
  RoomType,
  Screening,
} from '../models';
import * as roomSeatsUtils from '../../modules/room-seats/utils';

export default class InitialDatabaseSeed implements Seeder {
  public async run(_: Factory, connection: DataSource): Promise<void> {
    const languagesRepository = connection.getRepository(Language);
    const moviesRepository = connection.getRepository(Movie);
    const roomTypesRepository = connection.getRepository(RoomType);
    const roomsRepository = connection.getRepository(Room);
    const screeningsRepository = connection.getRepository(Screening);
    const reservationsRepository = connection.getRepository(Reservation);

    console.log('Creating languages...');
    const insertedLanguages = await languagesRepository.insert([
      {
        id: 'espanol',
        name: 'Español',
      },
      {
        id: 'ingles-subtitulado',
        name: 'Inglés subtitulado',
      },
      {
        id: 'portugues-subtitulado',
        name: 'Portugues subtitulado',
      },
    ]);
    console.log('Languages created!', insertedLanguages);

    console.log('Creating movies...');
    const insertedMovies = await moviesRepository.insert([
      {
        name: 'Top Gun: Maverick',
        genre: 'Action,Drama',
        durationInMinutes: 130,
        rated: 'PG-13',
        calification: 8.3,
        sinopsis:
          'Después de más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete Mitchell vuelve donde pertenece, siendo un valiente piloto de pruebas y esquivando un avance de rango que lo castigaría.',
        imageName:
          'https://es.web.img2.acsta.net/pictures/22/03/29/15/57/1533124.jpg',
        bannerName: 'foo',
        trailerUrl: 'foo',
        displayInBillboard: true,
        billboardPositionIndex: 0,
        displayInCarousel: true,
        carouselPositionIndex: 0,
        isPremiere: true,
      },
      {
        name: 'Barbie',
        genre: 'Aventura,Comedia,Fantasia',
        durationInMinutes: 113,
        rated: 'B',
        calification: 7.1,
        sinopsis:
          'Vivir en Barbie Land es ser un ser perfecto en un lugar perfecto. A menos que tengas una crisis existencial completa. O seas Ken.',
        imageName:
          'https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
        bannerName: 'foo',
        trailerUrl: 'foo',
        displayInBillboard: true,
        billboardPositionIndex: 1,
        displayInCarousel: true,
        carouselPositionIndex: 1,
        isPremiere: true,
      },
      {
        name: 'Oppenheimer',
        genre: 'Biografía,Drama,Historia',
        durationInMinutes: 180,
        rated: 'B-15',
        calification: 8.5,
        sinopsis:
          'La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.',
        imageName:
          'https://www.infobae.com/new-resizer/wJf5_q6HZudWLt0ZNPo-ryV0O2s=/992x1488/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/H2DVBWCFAZGYDFWWN4TEASWRZI.jpg',
        bannerName: 'foo',
        trailerUrl: 'foo',
        displayInBillboard: true,
        billboardPositionIndex: 2,
        displayInCarousel: true,
        carouselPositionIndex: 2,
        isPremiere: true,
      },
    ]);
    console.log('Movies created!', insertedMovies);

    console.log('Creating room types...');
    const insertedRoomTypes = await roomTypesRepository.insert([
      {
        id: '2d',
        name: '2D',
        price: 1000,
        isVisible: true,
      },
      {
        id: '3d',
        name: '3D',
        price: 1800,
        isVisible: true,
      },
      {
        id: 'monster',
        name: 'Monster Screen',
        price: 2500,
        isVisible: true,
      },
    ]);
    console.log('room types created!', insertedRoomTypes);

    console.log('Creating rooms...');
    const roomsToInsert = [];
    const autoGeneratedSeats = roomSeatsUtils.createListByColumnsAndRows(
      10,
      10,
    );

    for (let index = 0; index < insertedRoomTypes.identifiers.length; index++) {
      const identifier = insertedRoomTypes.identifiers[index];
      const room = roomsRepository.create();
      room.name = `Sala ${index + 1}`;
      room.isVisible = true;
      room.roomTypeId = identifier.id;
      room.seats = autoGeneratedSeats.map((seat) =>
        Object.assign(new RoomSeat(), seat),
      );
      roomsToInsert.push(room);
    }

    const insertedRooms = await roomsRepository.save(roomsToInsert);
    console.log('rooms created!', insertedRooms);

    console.log('Creating screenings');
    const movies = await moviesRepository.find({
      take: 2,
    });
    const languages = await languagesRepository.find({
      take: 2,
    });
    const rooms = await roomsRepository.find({
      take: 2,
      relations: {
        roomType: true,
        seats: true,
      },
    });

    const screeningsToInsert = [];

    for (const movie of movies) {
      for (const language of languages) {
        for (const room of rooms) {
          const screening = new Screening();
          screening.isVisible = true;
          screening.startsAt = new Date();
          screening.movieId = movie.id;
          screening.languageId = language.id;
          screening.roomId = room.id;
          screening.roomTypeId = room.roomTypeId;
          screening.seats = room.seats.map((seat) => ({
            ...seat,
            id: undefined,
            isVisible: true,
          })) as any;
          screeningsToInsert.push(screening);
        }
      }
    }
    const createdScreenings = await screeningsRepository.save(
      screeningsToInsert,
    );
    console.log('Screenings created!', createdScreenings);
  }
}
