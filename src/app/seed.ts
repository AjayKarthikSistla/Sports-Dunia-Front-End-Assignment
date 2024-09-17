import { faker } from "@faker-js/faker";
import fs from "fs";
import { z } from "zod";

export const CollegeSchema = z.object({
  rank: z.number().int(), 
  name: z.string(), 
  location: z.string(), 
  course: z.string(), 
  cutoff: z.string(), 
  fees: z.number(), 
  feesDetail: z.string(), 
  placement: z.string(),
  placementDetail: z.string(), 
  highestPackage: z.string(), 
  rating: z.number().min(1).max(10), 
  ratingDetail: z.number().min(1).max(1000), 
  ranking: z.string(),
  rankingYear: z.string(), 
  userReviewRating: z.number(), 
  featured: z.boolean(), 
});

const generateFakeColleges = (num: number): z.infer<typeof CollegeSchema>[] => {
    return Array.from({ length: num }, (_, index) => ({
      rank: index + 1, 
      name: faker.company.name() + " - Indian Institute of Technology - [IIT], " + faker.location.city(),
      location: faker.location.city() + ", " + faker.location.state() + " | AICTE Approved",
      course: faker.helpers.arrayElement([
        "B.Tech Computer Science Engineering",
        "B.Tech + M.Tech Mathematics and Computing",
        "B.Tech Electrical Engineering",
        "B.Tech Mechanical Engineering",
      ]) as string, 
      cutoff: `JEE-Advanced ${faker.date.recent().getFullYear()} Cutoff : ${faker.number.int({ min: 100, max: 200 })}`,
      fees: faker.number.int({ min: 200000, max: 300000 }), 
      feesDetail: "BE/B.Tech - 1st Year Fees",
      placement: "₹ " + faker.number.int({ min: 2000000, max: 3000000 }),
      placementDetail: "Average Package",
      highestPackage: "₹ " + faker.number.int({ min: 10000000, max: 20000000 }),
      rating: faker.number.float({ min: 1, max: 10 }), 
      ratingDetail: faker.number.int({ min: 1, max: 1000 }),
      ranking: "#" + faker.number.int({ min: 1, max: 10 }) + " in India",
      rankingYear: "NIRF " + faker.date.recent().getFullYear(),
      userReviewRating: faker.number.float({ min: 7, max: 10 }), 
      featured: faker.datatype.boolean(), 
    }));
  };
  

export const generateFakeData = () => {
  const colleges = generateFakeColleges(100);
  return { colleges };
};

const { colleges } = generateFakeData();
fs.writeFileSync("colleges.json", JSON.stringify(colleges, null, 2));
