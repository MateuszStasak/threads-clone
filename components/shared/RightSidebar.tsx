import Link from "next/link";

import { fetchMostPopularCommunities } from "@/lib/actions/community.actions";

export default async function RightSidebar() {
  const result = await fetchMostPopularCommunities();
  
    return (
        <section className='custom-scrollbar rightsidebar'>
          <div className='flex flex-1 flex-col justify-start'>
            <h3 className='text-heading4-medium text-light-1'>
              Suggested Communities
            </h3>
    
            <div className='mt-7 flex w-[350px] flex-col gap-9'>
            {result === null ? (
          <p className='no-result'>No Communities</p>
        ) : (
          <>
            {result.popularCommunities.map((community) => (
              <Link
                href={`/communities/${community.id}`}
                key={community.id}
                className=' text-light-1'
              ># {community.name}</Link>
            ))}
          </>
        )}
            </div>
          </div>
          <div className='flex flex-1 flex-col justify-start'>
            <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
            <div className='mt-7 flex w-[350px] flex-col gap-10'>
              <p className=' text-light-1'># nextjsIsTheBest</p>
            </div>
          </div>
        </section>
      );
    }