import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio from 'cheerio';
import { addSpaces } from 'src/utils/string';
import { FastestLapsService } from 'src/fastest-laps/fastest-laps.service';
import { MIN_YEAR } from 'src/constants/year';
import { RacesService } from 'src/races/races.service';

@Injectable()
export class CrawlService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fastestLapsService: FastestLapsService,
    private readonly racesService: RacesService,
  ) {
    // this.crawlFastestLaps();
    // this.crawlRaces();
  }

  async crawlFastestLaps(): Promise<any> {
    const MAX_YEAR = new Date().getFullYear();
    const years = Array.from(
      { length: MAX_YEAR - MIN_YEAR + 1 },
      (_, i) => i + MIN_YEAR,
    );

    try {
      const promises = years.map(
        async (year) => await this.getFastestLapsByYear(year),
      );
      const results = await Promise.allSettled(promises);

      const data = results
        .map((result) =>
          result.status === 'fulfilled' ? result.value : result.reason,
        )
        .flat(2);

      await this.fastestLapsService.deleteMany();
      return await this.fastestLapsService.createMany(data);
    } catch (error) {
      return error;
    }
  }

  async crawlRaces(): Promise<any> {
    const MAX_YEAR = new Date().getFullYear();
    const years = Array.from(
      { length: MAX_YEAR - MIN_YEAR + 1 },
      (_, i) => i + MIN_YEAR,
    );

    try {
      const promises = years.map(
        async (year) => await this.getRacesByYear(year),
      );
      const results = await Promise.allSettled(promises);

      const data = results
        .map((result) =>
          result.status === 'fulfilled' ? result.value : result.reason,
        )
        .flat(2);

      await this.racesService.deleteMany();

      return await this.racesService.createMany(data);
    } catch (error) {
      return error;
    }
  }

  async getFastestLapsByYear(year: Number): Promise<any> {
    const fastestLaps = [];
    try {
      const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/fastest-laps.html`;
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const fastestLap = {
          grandPrix: $(element).find('td:nth-child(2)').text().trim(),
          driver: addSpaces(
            $(element).find('td:nth-child(3)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(4)').text().trim(),
          time: $(element).find('td:nth-child(5)').text().trim()
            ? $(element).find('td:nth-child(5)').text().trim()
            : 'unknown',
          year: `${year}`,
        };
        fastestLaps.push(fastestLap);
      });

      return fastestLaps;
    } catch (error) {
      return error;
    }
  }

  async getRacesByYear(year: Number): Promise<any> {
    const rootUrl = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html`;
    const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/races.html`;
    const result1 = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const race = {
          grandPrix: $(element).find('td:nth-child(2)').text().trim(),
          date: $(element).find('td:nth-child(3)').text().trim(),
          winner: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim(),
          laps: $(element).find('td:nth-child(6)').text().trim(),
          time: $(element).find('td:nth-child(7)').text().trim()
            ? $(element).find('td:nth-child(7)').text().trim()
            : 'unknown',
          subUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', ''),

          year: `${year}`,
        };
        result1.push(race);
      });

      const arr_sub_url = result1.map((e) => e.subUrl);

      const promises = arr_sub_url.map(
        async (url) => await this.getRacesByYearAndZone(url),
      );
      const result2 = await Promise.allSettled(promises);

      const data_sub = result2.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const finalResult = result1.map((e, i) => ({ ...e, sub: data_sub[i] }));

      return finalResult;
    } catch (error) {
      return error;
    }
  }

  async getRacesByYearAndZone(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const race = {
          pos: $(element).find('td:nth-child(2)').text().trim(),
          no: $(element).find('td:nth-child(3)').text().trim(),
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim(),
          laps: $(element).find('td:nth-child(6)').text().trim(),
          retired: $(element).find('td:nth-child(7)').text().trim()
            ? $(element).find('td:nth-child(7)').text().trim()
            : 'unknown',
          pts: $(element).find('td:nth-child(8)').text().trim(),
        };
        data.push(race);
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}
