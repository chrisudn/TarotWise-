# Tarot Card Image Generation — Minions Style

> 用於 Sprint 9：卡片圖像生成
> 風格：Minions（小小兵動畫電影風格）+ 塔羅牌卡面風格

---

## 統一風格描述 (Global Style Prompt)

```
Minions movie style, cute yellow Minion characters, wearing classic blue overalls and silver goggles,
Pantalone yellow (#FCE029) skin tone, bright bold primary colors,
3D animated film aesthetic reminiscent of Illumination studios,
rounded pill-shaped bodies, cheerful expressive faces,
banana and gadget props, clean studio lighting,
3:4 aspect ratio, colorful dynamic background, pixar-like render quality.
```

---

## 塔羅牌卡面要素（每張都要包含）

要讓圖片看起來像「塔羅牌」，必須加入以下元素：

- **卡牌邊框** — 傳統塔羅牌風格邊框（金色或黑色，內外雙框線）
- **牌名字樣** — 底部或頂部有該牌的名稱（英文）
- **牌號** — 大阿爾卡納有羅馬數字，小阿爾卡納有數字/宮廷稱號
- **置中構圖** — 角色/場景在畫面中央
- **塔羅牌比例** — 嚴格 3:4

---

## 視覺語言指引

- **角色**：小小兵（Minions），黃色皮膚、藍色吊帶褲、銀色護目鏡
- **表情**：招牌誇張表情 — 大圓眼（單眼/雙眼）、張嘴笑、驚訝、委屈
- **道具**：香蕉、Gru 的發明、火箭、雷射槍、Bob 的泰迪熊 Tim、石像鬼寵物、沙蟲寵物
- **場景**：Gru 的地下實驗室、熱帶島嶼、火山基地、斑斕的卡通背景
- **色調**：鮮黃 #FCE029、寶藍 #4267B5、銀灰、螢光粉紅、霓虹綠
- **構圖**：塔羅牌標準置中、卡牌邊框、含牌名與編號

---

## 檔案命名規則

```
/public/cards/{id}-{english-name-snake}.png
```

範例：
- `00-the-fool.png`
- `01-the-magician.png`
- `22-ace-of-wands.png`

---

## 各牌 Prompt

### 大阿爾卡納 (Major Arcana) — 22 張

| ID | 牌名 | Promt 關鍵要素 |
|----|------|----------------|
| 00 | The Fool | Single Minion standing at cliff edge holding a banana like a walking stick, Bob's teddy bear Tim beside him, bright morning sky, innocent adventurous grin, tiny bundle on stick, one-eyed Minion |
| 01 | The Magician | Kevin Minion standing at a lab table, one hand pointing up one down, four Gru's gadgets on table (banana blaster, shrink ray, freeze ray, fart gun), glowing yellow energy above, scientific sparkles |
| 02 | The High Priestess | Minion in purple robe (like Scarlet Overlord's robe) sitting between two tall lab cylinders (one black one white), banana scroll in lap, crescent moon carved on floor, mysterious squint-eyed expression |
| 03 | The Empress | Female Minion character (like Scarlett's henchwomen style) in flower crown sitting in a field of bananas, flowing purple dress, lush island vegetation, waterfall in background, nurturing warm smile |
| 04 | The Emperor | Gru-like Minion in long black scarf and striped scarf, sitting on a throne made of lab equipment, red laser lights, serious expression but still cute, commanding presence |
| 05 | The Hierophant | Two-eyed Minion wearing a tall cardinal-like hat, standing between two pillars of stacked rocket boosters, hands in blessing gesture, two smaller Minions kneeling, ceremonial lab setting |
| 06 | The Lovers | Two Minions (one tall Kevin, one short Bob) standing under a heart-shaped floating banana, Tim the bear between them, warm tropical sunset, intertwined vines, choosing between two bananas |
| 07 | The Chariot | Stuart Minion driving a go-kart/chariot pulled by two Groo-like creatures (purple and gray), starry canopy made of fairy lights, Gru's house in background, determined toothy grin |
| 08 | Strength | Agnes-style Minion gently petting a tiny cute version of the purple monster, yellow sundress, infinity symbol made of bananas above, flower garden, calm courage |
| 09 | The Hermit | Old Minion (with white hair tuft) holding a lantern-shaped gadget with a glowing banana inside, standing on a snowy mini volcano peak, lonely but peaceful, soft blue island night |
| 10 | Wheel of Fortune | Giant wheel made of Gru's machines with Minions riding up and down in capsules, four iconic symbols in corners (banana, rocket, teddy bear, flamethrower), spinning motion indicated by speed lines |
| 11 | Justice | Minion judge in white wig and black robe holding a banana scale and a laser sword, sitting between two pillars of gold coins, yellow background, balanced symmetrical, stern cute face |
| 12 | The Hanged Man | Bob Minion hanging upside down from a jungle vine, Tim still clutched in hand, one goggle slipped off, serene expression, halo-like glow from a tropical fruit behind head |
| 13 | Death | Skeleton Minion (just bones but cute) in Gru-style armor riding a unicycle, fallen banana peels before it, rising sun over volcano, transformation and release, not scary |
| 14 | Temperance | Kevin Minion standing at water's edge on tropical island, pouring glowing potion between two beakers, one foot in water one on sand, path leading to distant lab, rainbow sky |
| 15 | The Devil | Evil Minion with Scarlet Overlord's crown and red glowing eyes, sitting on a throne of bank vaults, tiny Minions chained with loose chains, banana-shaped torch held down, purple red tones |
| 16 | The Tower | Gru's lab tower struck by a malfunctioning rocket, Minions flying out of windows with hilarious expressions, flames and banana debris, dramatic but comedic |
| 17 | The Star | Naked Minion (without overalls) kneeling by a glowing puddle of banana smoothie, pouring liquid from two beakers, seven star-shaped lights around, one central star glowing, peaceful night |
| 18 | The Moon | Two small volcanic islands in twilight, path of stepping stones between them, Kevin and Bob howling like wolves, a crawdad-like creature emerging from water, moon with banana shape |
| 19 | The Sun | Happy Minion riding a giant yellow rubber duck under a smiling cartoon sun, field of sunflowers, red Minions banner waving, pure joy and energy |
| 20 | Judgement | Minions rising from underground pods with arms outstretched, Gru above on a platform blowing a trumpet-shaped rocket launcher, awakening and renewal |
| 21 | The World | Dancing Minion surrounded by a wreath made of bananas, four corners with Minion recreations of the iconic symbols, confetti, completion and celebration |

### 權杖組 (Wands) — 火元素
*權杖化身為 Gru 的雷射槍 / 火箭炮 / 香蕉砲*

| ID | 牌名 | Prompt 關鍵要素 |
|----|------|----------------|
| 22 | Ace of Wands | One glowing laser gun standing upright, hand with blue glove emerging from cloud holding it, spark at tip, Gru's lab background, new invention |
| 23 | Two of Wands | Kevin Minion holding a globe standing between two rocket launchers, tropical island in background, planning and looking outward |
| 24 | Three of Wands | Stuart on cliff edge looking at three mini rocket ships on water, three ray guns planted in ground, expansion and waiting |
| 25 | Four of Wands | Four flamethrowers with banana garlands forming a canopy, two Minions celebrating underneath, castle of ice cream, stability |
| 26 | Five of Wands | Five Minions each holding a different gadget, all in playful fighting pose, chaotic but colorful energy, comedic battle |
| 27 | Six of Wands | Bob on a parade float holding a banana blaster, crowd of Minions cheering with gadgets, victory celebration |
| 28 | Seven of Wands | One-eyed Minion on rocky ground holding a freeze ray defensively against six approaching gadgets, persistence |
| 29 | Eight of Wands | Eight banana-shaped rockets flying diagonally through air, blue sky, rapid movement, clean dynamic composition |
| 30 | Nine of Wands | Bandaged Minion leaning on a ray gun, six gadgets behind him, resilience and determination |
| 31 | Ten of Wands | Minion carrying bundle of ten rocket launchers, bent forward, banana peels on ground, heavy burden but still smiling |
| 32 | Page of Wands | Messenger Minion holding a small laser pointer, colorful outfit (Hawaiian shirt), lizard pet on shoulder, open island |
| 33 | Knight of Wands | Minion riding a giant purple piranha creature, banana spear raised, action oriented |
| 34 | Queen of Wands | Female Minion leader on throne, holding a sunflower-shaped flamethrower, fluffy cat beside her, warm confident |
| 35 | King of Wands | Gru-style Minion in long black coat, holding a lightning-shaped gadget, commanding presence on throne |

### 聖杯組 (Cups) — 水元素
*聖杯化身為奶昔杯 / 果汁杯 / 香蕉船冰淇淋*

| ID | 牌名 | Prompt 關鍵要素 |
|----|------|----------------|
| 36 | Ace of Cups | One giant milkshake cup overflowing with banana smoothie, hand from cloud holding it, cherry on top with glowing sparkle |
| 37 | Two of Cups | Two Minions facing each other holding giant milkshake cups, clinking them, banana straws, partnership celebration |
| 38 | Three of Cups | Three Minions raising their cups in celebration, dancing on a table, fruits and ice cream around, party atmosphere |
| 39 | Four of Cups | Minion sitting under a palm tree, eyes closed, three full cups on ground, one cup offered by a robotic hand, discontent |
| 40 | Five of Cups | Minion in black cloak looking down at three spilled smoothie cups, two full cups behind, river of milk, bridge of licorice |
| 41 | Six of Cups | Two Minion kids in a garden, one offering a cup with a flower, six cups on pedestal, Tim the bear, nostalgia |
| 42 | Seven of Cups | Seven cups on a cloud each showing different visions (castle, banana mountain, rocket, crown, treasure, etc), Minion staring amazed |
| 43 | Eight of Cups | Minion walking away from stacked eight cups, moonlight, marshy ground, leaving behind the party |
| 44 | Nine of Cups | Minion sitting on a shelf with nine cups arranged behind, arms crossed, satisfied smug expression |
| 45 | Ten of Cups | Ten cups arranged in rainbow arc, happy Minion family (Kevin, Stuart, Bob) dancing, green tropical landscape |
| 46 | Page of Cups | Messenger Minion holding a cup with a tiny fish peeking out, colorful Hawaiian shirt, imaginative expression |
| 47 | Knight of Cups | Minion riding a giant seahorse, holding a cup like an offering, tropical sea, romantic sunset |
| 48 | Queen of Cups | Female Minion on throne by the sea, ornate cup with banana handles, mermaid-style tail decoration |
| 49 | King of Cups | Gru-like Minion on throne floating on a stormy sea of banana smoothie, cup scepter, emotionally balanced |

### 寶劍組 (Swords) — 風元素
*寶劍化身為雷射劍 / 光劍 / 冰凍光線槍*

| ID | 牌名 | Prompt 關鍵要素 |
|----|------|----------------|
| 50 | Ace of Swords | One glowing laser sword held point up by hand with blue glove, crown made of gears hanging on tip, cumulus clouds |
| 51 | Two of Swords | Blindfolded Minion holding two crossed laser swords, crescent moon from Gru's logo, seated on safe, difficult decision |
| 52 | Three of Swords | Three laser swords piercing a heart-shaped balloon, rain clouds, heartbreak and sorrow |
| 53 | Four of Swords | Minion lying on a lab bench like a tomb, three laser swords on wall and one beside, stained glass of banana |
| 54 | Five of Swords | Minion holding three laser swords, two defeated Minions walking away, shore of a lake, hollow victory |
| 55 | Six of Swords | Banana boat carrying Minion and six laser swords standing upright, rowing toward distant lab island |
| 56 | Seven of Swords | Minion sneaking away with five laser swords, two swords left behind, camp of other Minions |
| 57 | Eight of Swords | Blindfolded Minion surrounded by eight planted laser swords, tied with jump rope but comically |
| 58 | Nine of Swords | Minion sitting up in banana-shaped bed, nine laser swords drawn on wall like tally marks, hands on face, worried expression |
| 59 | Ten of Swords | Minion lying face down with ten laser swords comically stuck in back, banana peel beside him, but dawn rising |
| 60 | Page of Swords | Messenger Minion holding laser sword up, wind blowing his single tuft of hair, birds made of paper flying |
| 61 | Knight of Swords | Minion riding a giant hornet (like Gru's), laser sword raised, wind blowing, action and determination |
| 62 | Queen of Swords | Female Minion on throne, laser sword held up, crown with butterfly wings, purple storm clouds behind |
| 63 | King of Swords | Gru-like Minion on high-tech throne, laser sword raised, wind blowing lab coat, mountain of gadgets background |

### 錢幣組 (Pentacles) — 土元素
*錢幣化身為金幣 / 香蕉金幣 / Gru 的財寶*

| ID | 牌名 | Prompt 關鍵要素 |
|----|------|----------------|
| 64 | Ace of Pentacles | One giant gold coin with banana emblem held by gloved hand from cloud, garden path leading to vault, blooming flowers |
| 65 | Two of Pentacles | Minion juggler figure balancing two gold coins, lab equipment around, bank vault in background, multitasking |
| 66 | Three of Pentacles | Minion apprentice building a banana-themed machine, three coins design on blueprint, two engineers observing |
| 67 | Four of Pentacles | Scrooge-like Minion clutching one coin to chest, two under feet, one on head, protective greedy expression |
| 68 | Five of Pentacles | Two Minions outside in snow, passing a lit bank window with five coins, poverty and exclusion |
| 69 | Six of Pentacles | Minion weighing coins on a scale, giving to poorer Minion, balance of generosity |
| 70 | Seven of Pentacles | Minion leaning on a shovel, looking at seven coins growing on a banana tree, patience |
| 71 | Eight of Pentacles | Minion craftsman carving coins with banana stamp, tools around, focused work, skill development |
| 72 | Nine of Pentacles | Minion in tropical garden with vineyard of coins, nine coins arranged, pet bird on finger, luxury |
| 73 | Ten of Pentacles | Ten coins arranged in family tree pattern, old Minion couple with child (Bob), archway to home, legacy |
| 74 | Page of Pentacles | Messenger Minion standing in gold field, holding a coin like a magnifying glass, curious expression |
| 75 | Knight of Pentacles | Minion riding a slow steady mechanical bull, coin in hand, plowed field of chocolate behind, patient |
| 76 | Queen of Pentacles | Female Minion on throne in flower garden, coin on lap, bunny rabbit companion, nurturing |
| 77 | King of Pentacles | Gru-like Minion on throne decorated with gold vines, holding giant coin and scepter, bank vault background |

---

## DALL-E 3 專用輸入格式

DALL-E 3 吃自然語言，直接貼整段即可。

### 標準模板

```
一張塔羅牌風格的圖片，比例 3:4。

風格：小小兵（Minions）動畫電影風格，3D 渲染，鮮黃色皮膚的小小兵角色，
穿著經典藍色吊帶褲和銀色護目鏡，明亮飽和的色彩，Illumination 工作室風格。

塔羅牌卡面設計：有金色雙層邊框，底部有卡片名稱文字，頂部有羅馬數字或牌號。

[卡片名稱]（[Card Name]）

畫面內容：[各牌關鍵要素]
```

### 範例：The Fool

```
一張塔羅牌風格的圖片，比例 3:4。

風格：小小兵（Minions）動畫電影風格，3D 渲染，鮮黃色皮膚的小小兵角色，
穿著經典藍色吊帶褲和銀色護目鏡，明亮飽和的色彩，Illumination 工作室風格。

塔羅牌卡面設計：有金色雙層邊框，底部有"THE FOOL"文字，頂部有羅馬數字 0。

一張塔羅牌「0 - The Fool（愚者）」

畫面內容：一隻單眼的小小兵站在懸崖邊緣，手中拿著一根香蕉當作拐杖，
肩上背著小包袱，Bob 的泰迪熊 Tim 在他旁邊蹦蹦跳跳。
明亮的早晨天空，小小兵露出招牌天真冒險的笑容。
綠色的草地、藍天白雲，懸崖邊緣的場景。
```

---

## 使用方式

1. 將整段複製貼到 DALL-E 3（ChatGPT Plus 或 Bing Image Creator）
2. 所有 prompt 已包含：統一風格 + 塔羅牌邊框 + 牌名 + 牌號 + 角色場景
3. 產出後以 `{id}-{name}.png` 命名，放入 `/public/cards/` 目錄
4. 先測一張（The Fool），滿意後再批量產 78 張

## 完整 78 張 Prompt

請見 `docs/tarot-card-images-dalle-prompts.md`，每張都已經寫好整段可直接複製貼上的 DALL-E 3 格式。
