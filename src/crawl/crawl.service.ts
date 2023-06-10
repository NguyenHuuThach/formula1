import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import cheerio from 'cheerio';
import { addSpaces } from 'src/utils/string';
import { FastestLapsService } from 'src/fastest-laps/fastest-laps.service';
import { MIN_YEAR } from 'src/constants/year';
import { RacesService } from 'src/races/races.service';
import { TeamsService } from 'src/teams/teams.service';
import { DriversService } from 'src/drivers/drivers.service';

@Injectable()
export class CrawlService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fastestLapsService: FastestLapsService,
    private readonly racesService: RacesService,
    private readonly teamsService: TeamsService,
    private readonly driversService: DriversService,
  ) {}

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
      await this.racesService.createMany(data);

      return 'success';
    } catch (error) {
      return error;
    }
  }

  async crawlTeams(): Promise<any> {
    const MAX_YEAR = new Date().getFullYear();
    const years = Array.from(
      { length: MAX_YEAR - MIN_YEAR + 1 },
      (_, i) => i + MIN_YEAR,
    );

    try {
      const promises = years.map(
        async (year) => await this.getTeamsByYear(year),
      );
      const results = await Promise.allSettled(promises);

      const data = results
        .map((result) =>
          result.status === 'fulfilled' ? result.value : result.reason,
        )
        .flat(2);

      await this.teamsService.deleteMany();
      await this.teamsService.createMany(data);

      return 'success';
    } catch (error) {
      return error;
    }
  }

  async crawlDrivers(): Promise<any> {
    const MAX_YEAR = new Date().getFullYear();
    const years = Array.from(
      { length: MAX_YEAR - MIN_YEAR + 1 },
      (_, i) => i + MIN_YEAR,
    );

    try {
      const promises = years.map(
        async (year) => await this.getDriversByYear(year),
      );
      const results = await Promise.allSettled(promises);

      const data = results
        .map((result) =>
          result.status === 'fulfilled' ? result.value : result.reason,
        )
        .flat(2);

      await this.driversService.deleteMany();
      await this.driversService.createMany(data);

      return 'success';
    } catch (error) {
      return error;
    }
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
      await this.fastestLapsService.createMany(data);

      return 'success';
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
          grandPrix: $(element).find('td:nth-child(2)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(3)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(4)').text().trim() || '',
          time: $(element).find('td:nth-child(5)').text().trim() || '',
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
    const races = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const race = {
          grandPrix: $(element).find('td:nth-child(2)').text().trim() || '',
          date: $(element).find('td:nth-child(3)').text().trim() || '',
          winner: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          laps: $(element).find('td:nth-child(6)').text().trim() || '',
          time: $(element).find('td:nth-child(7)').text().trim() || '',
          resultUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', ''),
          fastestLapUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'fastest-laps.html'),
          pitStopSummaryUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'pit-stop-summary.html'),
          startingGridUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'starting-grid.html'),
          qualifyingUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'qualifying.html'),
          practice1Url:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'practice-1.html'),
          practice2Url:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'practice-2.html'),
          practice3Url:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(2)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', '')
              .replace('race-result.html', 'practice-3.html'),
          year: `${year}`,
        };
        races.push(race);
      });

      const arr_results_url = races.map((e) => e.resultUrl);
      const promises_results = arr_results_url.map(
        async (url) => await this.getRaceResults(url),
      );
      const results = await Promise.allSettled(promises_results);
      const data_results = results.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_fastest_laps_url = races.map((e) => e.fastestLapUrl);
      const promises_fastest_laps = arr_fastest_laps_url.map(
        async (url) => await this.getRaceFastestLaps(url),
      );
      const fastest_laps = await Promise.allSettled(promises_fastest_laps);
      const data_fastest_laps = fastest_laps.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_pit_stop_summary_url = races.map((e) => e.pitStopSummaryUrl);
      const promises_pit_stop_summary = arr_pit_stop_summary_url.map(
        async (url) => await this.getRacePitStopSummary(url),
      );
      const pit_stop_summary = await Promise.allSettled(
        promises_pit_stop_summary,
      );
      const data_pit_stop_summary = pit_stop_summary.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_starting_grid_url = races.map((e) => e.startingGridUrl);
      const promises_starting_grid = arr_starting_grid_url.map(
        async (url) => await this.getRaceStartingGrid(url),
      );
      const starting_grid = await Promise.allSettled(promises_starting_grid);
      const data_starting_grid = starting_grid.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_qualifying_url = races.map((e) => e.qualifyingUrl);
      const promises_qualifying = arr_qualifying_url.map(
        async (url) => await this.getRaceQualifying(url),
      );
      const qualifying = await Promise.allSettled(promises_qualifying);
      const data_qualifying = qualifying.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_practice3_url = races.map((e) => e.practice3Url);
      const promises_practice3 = arr_practice3_url.map(
        async (url) => await this.getRacePractice3(url),
      );
      const practice3 = await Promise.allSettled(promises_practice3);
      const data_practice3 = practice3.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_practice2_url = races.map((e) => e.practice2Url);
      const promises_practice2 = arr_practice2_url.map(
        async (url) => await this.getRacePractice2(url),
      );
      const practice2 = await Promise.allSettled(promises_practice2);
      const data_practice2 = practice2.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const arr_practice1_url = races.map((e) => e.practice1Url);
      const promises_practice1 = arr_practice1_url.map(
        async (url) => await this.getRacePractice1(url),
      );
      const practice1 = await Promise.allSettled(promises_practice1);
      const data_practice1 = practice1.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const finalResult = races.map((e, i) => ({
        ...e,
        results: data_results[i],
        fastestLaps: data_fastest_laps[i],
        pitStopSummary: data_pit_stop_summary[i],
        startingGrid: data_starting_grid[i],
        qualifying: data_qualifying[i],
        practice3: data_practice3[i],
        practice2: data_practice2[i],
        practice1: data_practice1[i],
      }));

      return finalResult;
    } catch (error) {
      return error;
    }
  }

  async getRaceResults(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const result = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          laps: $(element).find('td:nth-child(6)').text().trim() || '',
          timeRetired: $(element).find('td:nth-child(7)').text().trim() || '',
          pts: $(element).find('td:nth-child(8)').text().trim() || '',
        };
        data.push(result);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRaceFastestLaps(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const fastestLap = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          lap: $(element).find('td:nth-child(6)').text().trim() || '',
          timeOfDay: $(element).find('td:nth-child(7)').text().trim() || '',
          time:
            $(element).find('td:nth-child(8)').text().trim() ||
            $(element).find('td:nth-child(7)').text().trim() ||
            '',
          avgSpeed: $(element).find('td:nth-child(9)').text().trim() || '',
        };
        data.push(fastestLap);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRacePitStopSummary(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('pit-stop-summary.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          stops: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          lap: $(element).find('td:nth-child(6)').text().trim() || '',
          timeOfDay: $(element).find('td:nth-child(7)').text().trim() || '',
          time:
            $(element).find('td:nth-child(8)').text().trim() ||
            $(element).find('td:nth-child(7)').text().trim() ||
            '',
          total: $(element).find('td:nth-child(9)').text().trim() || '',
        };
        data.push(item);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRaceStartingGrid(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('starting-grid.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const starting_grid = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          time: $(element).find('td:nth-child(6)').text().trim() || '',
        };
        data.push(starting_grid);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRaceQualifying(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('qualifying.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          q1: $(element).find('td:nth-child(6)').text().trim() || '',
          q2: $(element).find('td:nth-child(7)').text().trim() || '',
          q3: $(element).find('td:nth-child(8)').text().trim() || '',
          laps: $(element).find('td:nth-child(9)').text().trim() || '',
        };
        data.push(item);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRacePractice3(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('practice-3.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          time: $(element).find('td:nth-child(6)').text().trim() || '',
          gap: $(element).find('td:nth-child(7)').text().trim() || '',
          laps: $(element).find('td:nth-child(8)').text().trim() || '',
        };
        data.push(item);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRacePractice2(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('practice-2.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          time: $(element).find('td:nth-child(6)').text().trim() || '',
          gap: $(element).find('td:nth-child(7)').text().trim() || '',
          laps: $(element).find('td:nth-child(8)').text().trim() || '',
        };
        data.push(item);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getRacePractice1(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      if (!`${response.data}`.includes('practice-1.html')) {
        return data;
      }

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          no: $(element).find('td:nth-child(3)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(4)').children('span').text(),
          ),
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          time: $(element).find('td:nth-child(6)').text().trim() || '',
          gap: $(element).find('td:nth-child(7)').text().trim() || '',
          laps: $(element).find('td:nth-child(8)').text().trim() || '',
        };
        data.push(item);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getTeamsByYear(year: Number): Promise<any> {
    const rootUrl = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html`;
    const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/team.html`;
    const teams = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const race = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          team: $(element).find('td:nth-child(3)').text().trim() || '',
          pts: $(element).find('td:nth-child(4)').text().trim() || '',
          standingUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(3)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', ''),
          year: `${year}`,
        };

        teams.push(race);
      });

      const arr_team_standings_url = teams.map((e) => e.standingUrl);
      const promises_team_standings = arr_team_standings_url.map(
        async (url) => await this.getTeamStandings(url),
      );
      const standings = await Promise.allSettled(promises_team_standings);
      const data_standings = standings.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const finalResult = teams.map((e, i) => ({
        ...e,
        standings: data_standings[i],
      }));

      return finalResult;
    } catch (error) {
      return error;
    }
  }

  async getTeamStandings(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const result = {
          grandPrix: $(element).find('td:nth-child(2)').text().trim() || '',
          date: $(element).find('td:nth-child(3)').text().trim() || '',
          pts: $(element).find('td:nth-child(4)').text().trim() || '',
        };
        data.push(result);
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getDriversByYear(year: Number): Promise<any> {
    const rootUrl = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html`;
    const url = `https://www.formula1.com/en/results/jcr:content/resultsarchive.html/${year}/drivers.html`;
    const drivers = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const item = {
          pos: $(element).find('td:nth-child(2)').text().trim() || '',
          driver: addSpaces(
            $(element).find('td:nth-child(3) a').children('span').text(),
          ),
          nationality: $(element).find('td:nth-child(4)').text().trim() || '',
          car: $(element).find('td:nth-child(5)').text().trim() || '',
          pts: $(element).find('td:nth-child(6)').text().trim() || '',
          standingUrl:
            `${rootUrl}` +
            $(element)
              .find('td:nth-child(3)')
              .children('a')
              .attr('href')
              .replace('/en/results.html', ''),

          year: `${year}`,
        };
        drivers.push(item);
      });

      const arr_driver_standings_url = drivers.map((e) => e.standingUrl);
      const promises_driver_standings = arr_driver_standings_url.map(
        async (url) => await this.getDriverStandings(url),
      );
      const driver_standings = await Promise.allSettled(
        promises_driver_standings,
      );
      const data_driver_standings = driver_standings.map((result) =>
        result.status === 'fulfilled' ? result.value : result.reason,
      );

      const finalResult = drivers.map((e, i) => ({
        ...e,
        standings: data_driver_standings[i],
      }));

      return finalResult;
    } catch (error) {
      return error;
    }
  }

  async getDriverStandings(url: string): Promise<any> {
    const data = [];

    try {
      const response = await this.httpService.axiosRef.get(url);
      const $ = cheerio.load(response.data);

      $('table.resultsarchive-table tbody tr').each((i, element) => {
        const result = {
          grandPrix: $(element).find('td:nth-child(2)').text().trim() || '',
          date: $(element).find('td:nth-child(3)').text().trim() || '',
          car: $(element).find('td:nth-child(4)').text().trim() || '',
          racePosition: $(element).find('td:nth-child(5)').text().trim() || '',
          pts: $(element).find('td:nth-child(6)').text().trim() || '',
        };
        data.push(result);
      });

      return data;
    } catch (error) {
      return error;
    }
  }
}
