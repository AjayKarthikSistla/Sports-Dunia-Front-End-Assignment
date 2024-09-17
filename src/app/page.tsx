'use client'

import { useState, useEffect, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { CheckSquare, Download, ChevronDown, ChevronRight, ArrowRightFromLine, ArrowRightIcon } from "lucide-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import collegesData from './colleges.json';

// const PAGE_SIZE = 10;

export default function Component() {
  const [colleges, setColleges] = useState<any[]>([]);
  // const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setColleges(collegesData);
      // setColleges(collegesData.slice(0, visibleCount));
    }
  }, [isClient]);

  // const fetchMoreData = useCallback(() => {
  //   setTimeout(() => {
  //     setColleges((prev) => [
  //       ...prev,
  //       ...collegesData.slice(visibleCount, visibleCount + PAGE_SIZE),
  //     ]);
  //     setVisibleCount((prev) => prev + PAGE_SIZE);
  //   }, 500); 
  // }, [visibleCount]);

  const handleSort = (key: string) => {
    const direction = (sortConfig?.direction === 'ascending') ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  const sortedColleges = [...colleges].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (key === 'rank') {
      return direction === 'ascending' ? a.rank - b.rank : b.rank - a.rank;
    }
    const aValue = a[key];
    const bValue = b[key];

    if (direction === 'ascending') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const filteredColleges = sortedColleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) return null; 

  return (
    <div className="container mx-auto p-4">
      <div className='flex w-full justify-center'>
        <Input
          placeholder="Search by college name"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          className="mb-4 w-1/2 justify-center"
        />
      </div>

      <Table className="w-full table-auto">
        <TableHeader>
          <TableRow className="bg-[#8dd3d3] text-white">
            <TableHead className=" font-semibold cursor-pointer w-1/12" onClick={() => handleSort('rank')}>
              CD Rank {(!sortConfig || sortConfig?.key === 'rank') && (sortConfig?.direction === 'ascending' ? '🔼' : '🔽')}
            </TableHead>
            <TableHead className=" font-semibold cursor-pointer w-1/2" onClick={() => handleSort('name')}>
              Colleges {(!sortConfig || sortConfig?.key === 'name') && (sortConfig?.direction === 'ascending' ? '🔼' : '🔽')}
            </TableHead>
            <TableHead className=" font-semibold cursor-pointer w-1/12" onClick={() => handleSort('fees')}>
              Course Fees {(!sortConfig || sortConfig?.key === 'fees') && (sortConfig?.direction === 'ascending' ? '🔼' : '🔽')}
            </TableHead>
            <TableHead className=" font-semibold cursor-pointer w-1/12" onClick={() => handleSort('placement')}>
              Placement {(!sortConfig || sortConfig?.key === 'placement') && (sortConfig?.direction === 'ascending' ? '🔼' : '🔽')}
            </TableHead>
            <TableHead className=" font-semibold cursor-pointer w-1/12" onClick={() => handleSort('rating')}>
              User Reviews {(!sortConfig || sortConfig?.key === 'rating') && (sortConfig?.direction === 'ascending' ? '🔼' : '🔽')}
            </TableHead>
            <TableHead className=" font-semibold w-1/12">Ranking</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <InfiniteScroll
            dataLength={filteredColleges.length}
            next={fetchMoreData}
            hasMore={visibleCount < collegesData.length}
            loader={<h4>Loading...</h4>}
            className="w-full"
          > */}
          {filteredColleges.map((college, index) => (
            <TableRow key={index} className={index % 2 === 0 ? "bg-white hover:bg-[#fff5eb]" : "bg-cyan-50 hover:bg-[#fff5eb]"}>
              <TableCell className="p-4 border-b w-auto ">#{college.rank}</TableCell>
              <TableCell className="p-4 border-b w-auto relative">
                {college.featured && (
                  <div className="absolute top-0 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-b-lg">
                    Featured
                  </div>
                )}
                <div className="flex items-start space-x-2 mt-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-blue-600">{college.name}</h3>
                    <p className="text-sm text-gray-500">{college.location}</p>

                    <div className="inline-block bg-orange-100 border-l-4 border-orange-500 rounded-r-lg overflow-hidden mt-1">
                      <div className="px-2 py-1">
                        <div className="flex items-center text-orange-700 ">
                          {college.course}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </div>
                        <div className="text-orange-600 text-xs ">
                          {college.cutoff}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 space-x-2 flex w-full justify-between items-center">
                      <div className='flex '>
                        <div>
                          <ArrowRightIcon className="inline h-4 w-4 text-orange-500 " />
                        </div>
                        <div className="text-orange-500">
                          Apply Now
                        </div>
                      </div>

                      <div className="text-teal-500 flex">
                        <Download className="mr-1 h-4 w-4" /> Download Brochure
                      </div>
                      <div className="text-gray-500 flex">
                        <CheckSquare className="mr-1 h-4 w-4" />Add to Compare
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-4 border-b w-auto">
                <p className="font-semibold">₹ {college.fees}</p>
                <p className="text-xs text-gray-500">{college.feesDetail}</p>
                <Button variant="link" size="sm" className="text-orange-500 p-0">
                  Compare Fees
                </Button>
              </TableCell>
              <TableCell className="p-4 border-b w-auto">
                <p className="font-semibold">{college.placement}</p>
                <p className="text-xs text-gray-500">{college.placementDetail}</p>
                <p className="text-sm text-gray-700">{college.highestPackage}</p>
                <p className="text-xs text-gray-500">Highest Package</p>
                <Button variant="link" size="sm" className="text-orange-500 p-0">
                  Compare Placement
                </Button>
              </TableCell>
              <TableCell className="p-4 border-b w-auto">
                <div className="flex items-center">
                  <div >
                    <div className='flex w-full items-center'>
                      <span className="text-2xl font-bold text-orange-500 mr-1">•</span>

                      <p className="font-semibold">{college.rating.toFixed(1)}/10</p>

                    </div>
                    <p className="text-xs text-gray-500">Based on {college.ratingDetail} reviews</p>
                    <Button variant="link" size="sm" className="text-blue-500 p-0">
                      Read {college.ratingDetail} Reviews
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="p-4  w-auto h-max  ">
                <p className="font-semibold">{college.ranking}</p>
                <p className="text-xs text-gray-500">{college.rankingYear}</p>
                <div className="flex items-center mt-1">
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-1" />
                  <div className="w-6 h-6 bg-gray-200 rounded-full mr-1" />
                  <Button variant="link" size="sm" className="text-blue-500 p-0">
                    View Ranking
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {/* </InfiniteScroll> */}
        </TableBody>
      </Table>
    </div>
  );
}