《歷史人物挑戰站》平板電子抽卡遊戲

檔案：index.html、styles.css、app.js
請保持三個檔案放在同一資料夾，不能只上傳 index.html。

【玩法】
1. 主頁選擇 P.1–P.3 或 P.4–P.6。
2. 點擊「抽取題卡」。
3. 參加者選答案；一經選擇即揭曉，不能更改。
4. 答對：由大使派一份小禮物；答錯：顯示正確答案並鼓勵。
5. 點擊「下一位參加者」返回年級選擇頁。

【題庫】
初級10題：6題是非題（對、錯各3題）＋4題二選一；5題配原創向量情境插畫。
進階10題：三選一。
每次從所選年級的題庫隨機抽一題，10題抽完才重洗，減少重複。
題目可在 app.js 的 low 和 high 陣列修改；a 是正確答案的索引（第一個選項是0）。

【發布至 GitHub Pages】
1. 登入 github.com，建立一個 Public repository，例如 history-booth-game。
2. 點選 Add file → Upload files，上傳 index.html、styles.css、app.js（不要只上傳 zip）。
3. 按 Commit changes。
4. 進入 Settings → Pages，Build and deployment 選 Deploy from a branch。
5. Branch 選 main，資料夾選 /(root)，按 Save。
6. 等待網站發布，於 Pages 顯示的網址開啟遊戲。
7. 用 iPad Safari 測試，建議使用橫向顯示。可以透過「分享 → 加入主畫面」建立捷徑。

【活動前測試】
- 兩個難度都能開啟、抽題、答題及返回主頁。
- 初級5幅插畫正常顯示。
- 每部平板都已成功開啟遊戲頁面。
- Wi-Fi 穩定；建議事先載入遊戲並避免活動期間重新整理。
- 禮物由大使實際派發，遊戲本身不記錄領獎次數。
- 不收集參加者姓名或個人資料。

【注意】
- 這是可在 Safari 開啟的靜態網頁遊戲，首次載入需有網絡；載入後遊戲本身不會向外部伺服器請求資料。
- 正式活動前請教師核對所有題目及答案。
