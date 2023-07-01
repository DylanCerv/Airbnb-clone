import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser, {
  ICurrentUserParams
} from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import { useEffect, useState } from "react";
import { Listing } from '@prisma/client';

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  // const listings = await getListings(searchParams);
  // const currentUser = await getCurrentUser();

  let listings:any;
  let currentUser:any;

  useEffect(()=>{
    const fetchData = async () => {
      currentUser = await getCurrentUser();
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
      listings = await getListings(searchParams);
    };

    fetchData();

  }, [searchParams]);


  // const [listings, setListings] = useState<IListingsParams[]>([]);
  // const [currentUser, setCurrentUser] = useState<ICurrentUserParams|null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const listingsData = await getListings(searchParams);
  //       setListings(listingsData);
  
  //       const currentUserData = await getCurrentUser();
  //       setCurrentUser(currentUserData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, [searchParams]);


  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
