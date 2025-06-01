import { IData_show, IShow } from "@/interfaces";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTheYear = (date: string | undefined) => {
  return (date) ? new Date(date).getFullYear() : '';
}

export const truncateText = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit) + ".." : text;
}

export const extractShowData = (show: IShow): IData_show => {
  return {
    id: show.id,
    media_type: show.name ? "tv" : "movie",
    overview: show.overview,
    poster_path: show.poster_path,
    title: show.name || show.title,
    vote_average: show.vote_average.toFixed(1),
    release_date: show.first_air_date || show.release_date,
  }
}

export function getRandomNumber(limit: number): number {
  return Math.floor(Math.random() * limit);
}

