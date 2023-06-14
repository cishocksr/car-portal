import { CustomFilter, Hero, SearchBar } from '@/components';
import CarCard from '@/components/CarCard';
import { fetchCars } from '@/utils';
import Image from 'next/image';

export default async function Home() {
  const allCars = await fetchCars();

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  console.log(allCars);
  return (
    <main className='overflow-hidden '>
      {/* Hero Section */}
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home_text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalog</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filter'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' />
            <CustomFilter title='year' />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__class-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car}/>
              ))}
            </div>
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
