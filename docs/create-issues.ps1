Sprint 1 Issues — 請在 GitHub Settings 將 token 授權給 chrisudn/TarotWise- 後，執行以下指令批次建立：

# 設定 gh 別名（一次即可）
Set-Alias gh "C:\Program Files\GitHub CLI\gh.exe"

# 批次建立 6 個 Issues
gh issue create --repo chrisudn/TarotWise- --title "T1-1: 專案初始化 + Tailwind 設定 + 字型主題" --label enhancement
gh issue create --repo chrisudn/TarotWise- --title "T1-2: 建立 78 張牌資料結構" --label enhancement
gh issue create --repo chrisudn/TarotWise- --title "T1-3: 隨機抽牌邏輯 + 正/逆位隨機" --label enhancement
gh issue create --repo chrisudn/TarotWise- --title "T1-4: 頁面佈局：首頁" --label enhancement
gh issue create --repo chrisudn/TarotWise- --title "T1-5: 牌面顯示元件 (CardDisplay)" --label enhancement
gh issue create --repo chrisudn/TarotWise- --title "T1-6: 大字型主題實作 + 響應式基礎" --label enhancement
