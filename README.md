## Description

Formular1 test

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Tổ chức Schema

1. FastestLapSchema:

- Là dữ liệu: GIẢI THƯỞNG LAP NHANH NHẤT DHL.
- Dữ liệu crawl ở Url:
  https://www.formula1.com/en/results.html/2023/fastest-laps.html

2. RaceSchema: tổ chức theo Bucket Pattern

- Là dữ liệu: CUỘC ĐUA theo mỗi năm.
- bao gồm cả dữ liệu con của nó là:
  . KẾT QUẢ CUỘC ĐUA theo mỗi khu vực theo mỗi năm.
  . VÒNG NHANH NHẤT theo mỗi khu vực theo mỗi năm.
  . TÓM TẮT DỪNG PIT theo mỗi khu vực theo mỗi năm
  . LƯỚI BẮT ĐẦU theo mỗi khu vực theo mỗi năm.
  . LUYỆN TẬP 3 theo mỗi khu vực theo mỗi năm.
  . LUYỆN TẬP 2 theo mỗi khu vực theo mỗi năm.
  . LUYỆN TẬP 1 theo mỗi khu vực theo mỗi năm.
- Dữ liệu crawl ở Url:
  https://www.formula1.com/en/results.html/2023/races.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/race-result.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/fastest-laps.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/pit-stop-summary.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/starting-grid.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/qualifying.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/practice-3.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/practice-2.html
  https://www.formula1.com/en/results.html/2023/races/1141/bahrain/practice-1.html

  3. TeamSchema: tổ chức theo Bucket Pattern

- Là dữ liệu: TEAM theo mỗi năm.
- bao gồm cả dữ liệu con của nó là:
  . BẢNG XẾP HẠNG của team đó theo mỗi năm.
- Dữ liệu crawl ở Url:
  https://www.formula1.com/en/results.html/2023/team.html
  https://www.formula1.com/en/results.html/2023/team/alfa_romeo_ferrari.html

  4. DriverSchema: tổ chức theo Bucket Pattern

- Là dữ liệu: TAY ĐUA theo mỗi năm.
- bao gồm cả dữ liệu con của nó là:
  . BẢNG XẾP HẠNG của tay đua đó theo mỗi năm.
- Dữ liệu crawl ở Url:
  htthttps://www.formula1.com/en/results.html/2023/drivers.html
  https://www.formula1.com/en/results.html/2023/drivers/FERALO01/fernando-alonso.html

## Tổ chức API

1. Các API Crawl Data:

- http://localhost:3000/crawl/races: Lấy dữ liệu kết quả cuộc đua.
- http://localhost:3000/crawl/fastest-laps: Lấy dữ liệu DHL FASTEST LAP AWARD.
- http://localhost:3000/crawl/teams: Lấy dữ liệu các team.
- http://localhost:3000/crawl/drivers: Lấy dữ liệu các tay đua.

2. 4 API tương ứng với việc lấy danh sách: cuộc đua, vòng nhanh nhất DHL, đội, các tay đua theo năm:

- http://localhost:3000/races/{year}
- http://localhost:3000/fastest-laps/{year}
- http://localhost:3000/teams/{year}
- http://localhost:3000/drivers/{year}

- Mỗi phần tử trong danh sách trả về sẽ có các phần tử con chứa đầy đủ data của đối tượng.
- VD: Lấy danh sách các cuộc đua trong năm 2023:
  . Gồm danh sách trong năm 2023 theo mỗi khu vực.
  . Trong mỗi khu vực sẽ gồm tất cả: kết quả cuộc đua, vòng nhanh nhất, tóm tắt dừng pit, lưới bắt đầu, qualifying, thực hành 1,...

## SẼ Optimize

- Dùng Redis để cache.
- Dùng thư viện compression để giảm băng thông đường truyền.
