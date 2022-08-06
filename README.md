# My Restaurant List
新增屬於自己的餐廳口袋名單，瀏覽、編輯、更多資訊一站搞定。

### 搜尋實際操作
![restaurant-list](https://user-images.githubusercontent.com/108853120/180142857-2b667937-39b5-464c-a835-ad9700120085.gif)


<br />

### 功能介紹

| 功能 | 你可以...... |
| ------ | ----------- |
| 逛逛  | 隨心所欲瀏覽所有餐廳 |
| 更多 | 點選以查看餐廳的更多詳細資訊 (地址、電話) |
| 連結    | 貼心連結所選餐廳的地址到 Google 地圖 |
| 搜尋    | 以店名或料理類別搜尋特定餐廳 |
| 新增    | 新增自己的餐廳口袋名單，需要就打開來看 |
| 編輯    | 隨時隨地編輯各種細節、更新最新資訊 |
| 刪除    | 舊愛雖然美，但留著不如先刪除吧 |
<br />
<br />

## 開發工具
- Node.js 16.14.2
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 4.3.1
- Font-awesome 5.8.1
- Mongoose 5.9.7
- MongoDB
<br />
<br />


## 安裝流程
1. 請先確認有安裝 node.js 與 npm

2. 將專案 clone 到本地

3. 在本地開啟之後，透過終端機進入資料夾，輸入： `npm install`

4. 安裝完畢後，設定環境變數連線 MongoDB
`MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority`

5. 繼續輸入： `npm run dev` 及 `npm run seed` 載入資料

5. 若看見此行訊息則代表順利運行， `express is listening on localhost:3000`

6. 接下來就可以打開瀏覽器進入以下網址 [http://localhost:3000](http://localhost:3000) 開始使用囉！

7. 若欲暫停使用，按下 `ctrl + c` 即可
