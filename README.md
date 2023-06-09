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
