import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, { 
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import { useEffect, useState } from "react";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = ({ searchParams }: HomeProps) => {
  // const listings = await getListings(searchParams);
  // const currentUser = await getCurrentUser();

  // if (listings.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState showReset />
  //     </ClientOnly>
  //   );
  // }

  const [listings, setListings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsData = await getListings(searchParams);
        setListings(listingsData);
  
        const currentUserData = await getCurrentUser();
        setCurrentUser(currentUserData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchParams]);


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
