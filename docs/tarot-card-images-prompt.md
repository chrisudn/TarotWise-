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

## 具名角色對照表

| 角色 | 特徵 | 適合的牌義 |
|------|------|-----------|
| **Kevin** | 高個子、沖天炮髮型、隊長、勇敢負責 | 領導力、魔法師、王者 |
| **Stuart** | 單眼、中分塌髮、貪吃、愛音樂 | 冒險、享樂、行動力 |
| **Bob** | 雙眼異色、身材矮小、抱著 Tim、純真 | 純真、情感、隱者 |
| **Otto** | 圓滾滾、戴牙套、開朗新角色 | 青春、好奇、新開始 |
| **Dave** | 單眼、西裝頭、愛火箭筒和杯子蛋糕 | 貪婪、行動、滿足 |
| **Carl** | 曾扮偵探、應變力強 | 正義、秩序、韌性 |
| **Phil** | 曾扮女僕清掃、謙遜低調 | 隱居、勞動、謙遜 |
| **Tim（小小兵）** | 高瘦留鬍子、側分髮、長者風範 | 智慧、教導、神秘 |
| **John** | 調皮惡作劇 | 欺騙、策略 |
| **Mark** | 多變、曾扮女孩 | 機警、多面性 |
| **Donny** | 神偷奶爸2登場 | 騎士、穩重 |
| **Norbert** | 小小兵外傳登場 | 過渡、轉變 |
| **Gru（人類）** | 系列主角、原惡棍、後來成英雄父親 | 皇帝、審判、權威 |
| **Agnes（人類）** | 最小的女兒、愛獨角獸、純真溫柔 | 力量（溫柔制勝）|
| **Edith（人類）** | 二女兒、男孩子氣 | 女皇后（劍/杖） |

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

| ID | 牌名 | 角色 | Prompt 關鍵要素 |
|----|------|------|----------------|
| 00 | The Fool | **Bob** | Short Bob with different-colored eyes standing at cliff edge holding a banana like a walking stick, carrying **Tim** the teddy bear, bright morning sky, innocent adventurous grin, tiny bundle on stick |
| 01 | The Magician | **Kevin** | Tall Kevin (spike hair, leader) standing at a lab table, one hand pointing up one down, four Gru's gadgets on table (banana blaster, shrink ray, freeze ray, fart gun), glowing yellow energy above, scientific sparkles |
| 02 | The High Priestess | **Tim（小小兵）** | Tall thin Tim the Minion (mustache, side-parted hair) in purple robe sitting between two tall lab cylinders (one black one white), banana scroll in lap, crescent moon carved on floor, mysterious wise expression |
| 03 | The Empress | **Agnes風格女性小小兵** | Agnes-inspired female Minion in flower crown sitting in a field of bananas, flowing purple dress, lush island vegetation, waterfall in background, nurturing warm smile |
| 04 | The Emperor | **Gru風格小小兵** | Gru-like Minion in long black coat and striped scarf, sitting on a throne made of lab equipment, red laser lights, serious but cute, commanding presence |
| 05 | The Hierophant | **Tim（小小兵）** | Tim the Minion (tall, mustached elder) wearing a tall cardinal-like hat, standing between two pillars of rocket boosters, hands in blessing, **Dave** and **Carl** kneeling at his feet, ceremonial lab setting |
| 06 | The Lovers | **Kevin + Bob** | Tall Kevin and short Bob standing under a heart-shaped floating banana, **Tim** the teddy bear between them, warm tropical sunset, intertwined vines, choosing between two bananas |
| 07 | The Chariot | **Stuart** | Stuart (one-eyed, center-part hair) driving a go-kart/chariot pulled by two Groo-like creatures (purple and gray), starry canopy of fairy lights, Gru's house in background, determined toothy grin |
| 08 | Strength | **Agnes（人類女孩）** | Human girl Agnes in yellow sundress gently petting a tiny cute purple monster, infinity symbol made of bananas above, flower garden, calm courage and gentle strength |
| 09 | The Hermit | **Phil** | Phil the Minion (humble, quiet) holding a lantern-shaped gadget with a glowing banana inside, standing on a snowy mini volcano peak, lonely but peaceful, soft blue island night |
| 10 | Wheel of Fortune | **Kevin, Stuart, Bob, Dave, Carl** | Giant wheel made of Gru's machines with Kevin, Stuart, Bob, Dave, Carl riding up and down in capsules, four iconic symbols in corners (banana, rocket, teddy bear, flamethrower), spinning motion |
| 11 | Justice | **Carl** | Carl the Minion (detective role) in white wig and black robe holding a banana scale and a laser sword, sitting between two pillars of gold coins, yellow background, balanced symmetrical, stern cute face |
| 12 | The Hanged Man | **Bob** | Bob Minion hanging upside down from a jungle vine, **Tim** still clutched in hand, one goggle slipped off, serene expression, halo-like glow from a tropical fruit behind head |
| 13 | Death | **Dave（骷髏版）** | Dave as skeleton Minion (just bones but cute) in Gru-style armor riding a unicycle, fallen banana peels before it, rising sun over volcano, transformation and release, not scary |
| 14 | Temperance | **Kevin** | Kevin standing at water's edge on tropical island, pouring glowing potion between two beakers, one foot in water one on sand, path leading to distant lab, rainbow sky |
| 15 | The Devil | **邪惡小小兵** | Evil Minion with Scarlet Overlord's crown and red glowing eyes, sitting on a throne of bank vaults, tiny **Bob** and **Stuart** chained with loose chains, banana-shaped torch held down, purple red tones |
| 16 | The Tower | **Kevin, Stuart, Dave, Carl, Phil** | Gru's lab tower struck by a malfunctioning rocket, Kevin, Stuart, Dave, Carl, Phil flying out of windows with hilarious expressions, flames and banana debris, dramatic but comedic |
| 17 | The Star | **Otto** | Otto (round, braces, new cheerful character) without overalls kneeling by a glowing puddle of banana smoothie, pouring liquid from two beakers, seven star-shaped lights around, one central star glowing, peaceful night |
| 18 | The Moon | **Kevin + Stuart** | Two small volcanic islands in twilight, path of stepping stones between them, Kevin and Stuart howling like wolves, a crawdad-like creature emerging from water, moon with banana shape |
| 19 | The Sun | **Bob** | Short joyful Bob riding a giant yellow rubber duck under a smiling cartoon sun, field of sunflowers, red Minions banner waving, pure joy and energy |
| 20 | Judgement | **Gru + Kevin, Stuart, Bob** | Kevin, Stuart, Bob and Minions rising from underground pods with arms outstretched, Gru above on a platform blowing a trumpet-shaped rocket launcher, awakening and renewal |
| 21 | The World | **Stuart** | Stuart (loves music and dancing) dancing surrounded by a wreath made of bananas, four corners with Minion recreations of iconic symbols, confetti, completion and celebration |

### 權杖組 (Wands) — 火元素
*權杖化身為 Gru 的雷射槍 / 火箭炮 / 香蕉砲*

| ID | 牌名 | 角色 | Prompt 關鍵要素 |
|----|------|------|----------------|
| 22 | Ace of Wands | Gru的手套 | One glowing laser gun standing upright, Gru's blue-gloved hand emerging from cloud holding it, spark at tip, Gru's lab background, new invention |
| 23 | Two of Wands | **Kevin** | Kevin (tall, spike hair) holding a globe standing between two rocket launchers, tropical island in background, planning and looking outward |
| 24 | Three of Wands | **Stuart** | Stuart (one-eyed, center-part) on cliff edge looking at three mini rocket ships on water, three ray guns planted in ground, expansion and waiting |
| 25 | Four of Wands | **Kevin + Bob** | Four flamethrowers with banana garlands forming a canopy, Kevin and Bob celebrating underneath, castle of ice cream, stability and belonging |
| 26 | Five of Wands | **Kevin, Stuart, Bob, Dave, Carl** | Kevin, Stuart, Bob, Dave, Carl each holding a different gadget, all in playful fighting pose, chaotic but colorful, comedic battle |
| 27 | Six of Wands | **Bob** | Bob on a parade float holding a banana blaster, crowd of Minions (Kevin, Stuart, Dave) cheering with gadgets, victory celebration |
| 28 | Seven of Wands | **Dave** | Dave (one-eyed, adventurous) on rocky ground holding a freeze ray defensively against six approaching gadgets, persistence |
| 29 | Eight of Wands | — | Eight banana-shaped rockets flying diagonally through air, blue sky, rapid movement, clean dynamic composition |
| 30 | Nine of Wands | **Carl** | Bandaged Carl leaning on a ray gun, six gadgets behind him, resilience and determination |
| 31 | Ten of Wands | **Phil** | Phil carrying bundle of ten rocket launchers bent forward, banana peels on ground, heavy burden but still smiling |
| 32 | Page of Wands | **Otto** | Otto (round, braces, new character) as messenger holding a small laser pointer, colorful Hawaiian shirt, lizard pet on shoulder, open island |
| 33 | Knight of Wands | **Donny** | Donny riding a giant purple piranha creature, banana spear raised, action oriented |
| 34 | Queen of Wands | **Edith風格女性小小兵** | Edith-inspired female Minion (tomboy-style) on throne, holding a sunflower-shaped flamethrower, fluffy cat beside her, warm confident |
| 35 | King of Wands | **Kevin（Gru風格）** | Kevin in Gru-style long black coat, holding a lightning-shaped gadget, commanding presence on throne |

### 聖杯組 (Cups) — 水元素
*聖杯化身為奶昔杯 / 果汁杯 / 香蕉船冰淇淋*

| ID | 牌名 | 角色 | Prompt 關鍵要素 |
|----|------|------|----------------|
| 36 | Ace of Cups | Gru的手套 | One giant milkshake cup overflowing with banana smoothie, Gru's blue-gloved hand from cloud holding it, cherry on top with glowing sparkle |
| 37 | Two of Cups | **Kevin + Bob** | Kevin and Bob facing each other holding giant milkshake cups, clinking them, banana straws, partnership celebration |
| 38 | Three of Cups | **Kevin, Stuart, Bob** | Kevin, Stuart, Bob raising their cups in celebration, dancing on a table, fruits and ice cream around, party atmosphere |
| 39 | Four of Cups | **Stuart** | Stuart sitting under a palm tree, eyes closed, three full cups on ground, one cup offered by a robotic hand, discontent |
| 40 | Five of Cups | **Bob** | Bob in black cloak looking down at three spilled smoothie cups, Tim teddy bear beside him, two full cups behind, river of milk, bridge of licorice |
| 41 | Six of Cups | **Bob + Otto** | Bob (as kid) and Otto in a garden, Bob offering a cup with a flower, six cups on pedestal, Tim the bear, nostalgia |
| 42 | Seven of Cups | **Stuart** | Seven cups on a cloud each showing different visions (castle, banana mountain, rocket, crown, treasure, etc), Stuart staring amazed (easily distracted dreamer) |
| 43 | Eight of Cups | **Phil** | Phil walking away from stacked eight cups, moonlight, marshy ground, leaving behind the party |
| 44 | Nine of Cups | **Dave** | Dave sitting on a shelf with nine cups (and cupcakes) arranged behind, arms crossed, satisfied smug expression |
| 45 | Ten of Cups | **Kevin, Stuart, Bob** | Ten cups arranged in rainbow arc, happy Minion family Kevin, Stuart, Bob dancing, green tropical landscape |
| 46 | Page of Cups | **Otto** | Otto as messenger holding a cup with a tiny fish peeking out, colorful Hawaiian shirt, imaginative expression |
| 47 | Knight of Cups | **Donny** | Donny riding a giant seahorse, holding a cup like an offering, tropical sea, romantic sunset |
| 48 | Queen of Cups | **Margo風格女性小小兵** | Margo-inspired female Minion on throne by the sea, ornate cup with banana handles, mermaid-style tail decoration |
| 49 | King of Cups | **Kevin** | Kevin in Gru-like style on throne floating on a stormy sea of banana smoothie, cup scepter, emotionally balanced |

### 寶劍組 (Swords) — 風元素
*寶劍化身為雷射劍 / 光劍 / 冰凍光線槍*

| ID | 牌名 | 角色 | Prompt 關鍵要素 |
|----|------|------|----------------|
| 50 | Ace of Swords | Gru的手套 | One glowing laser sword held point up by Gru's blue-gloved hand, crown made of gears hanging on tip, cumulus clouds |
| 51 | Two of Swords | **Bob** | Bob blindfolded holding two crossed laser swords (naive, confused by hard choice), crescent moon from Gru's logo, seated on safe, difficult decision |
| 52 | Three of Swords | **Stuart** | Three laser swords piercing a heart-shaped balloon near Stuart (emotionally hurt, dramatic), rain clouds, heartbreak and sorrow |
| 53 | Four of Swords | **Dave** | Dave lying on a lab bench like a tomb, three laser swords on wall and one beside, stained glass of banana, rest and contemplation |
| 54 | Five of Swords | **Kevin** | Kevin holding three laser swords, two defeated Minions walking away, shore of a lake, hollow victory |
| 55 | Six of Swords | **Norbert** | Banana boat carrying Norbert and six laser swords standing upright, rowing toward distant lab island, transition and change |
| 56 | Seven of Swords | **John** | John (mischievous trickster) sneaking away with five laser swords, two swords left behind, camp of other Minions |
| 57 | Eight of Swords | **Carl** | Carl blindfolded surrounded by eight planted laser swords, tied with jump rope but comically loose (can escape) |
| 58 | Nine of Swords | **Otto** | Otto (anxious, braces biting lip) sitting up in banana-shaped bed, nine laser swords drawn on wall like tally marks, hands on face, worried expression |
| 59 | Ten of Swords | **Phil** | Phil lying face down with ten laser swords comically stuck in back, banana peel beside him, but dawn rising |
| 60 | Page of Swords | **Mark** | Mark (versatile, alert) as messenger holding laser sword up, wind blowing his single tuft of hair, birds made of paper flying |
| 61 | Knight of Swords | **Stuart** | Stuart riding a giant hornet (like Gru's), laser sword raised, wind blowing, action and determination |
| 62 | Queen of Swords | **Edith風格女性小小兵** | Edith-inspired female Minion on throne, laser sword held up, crown with butterfly wings, purple storm clouds behind |
| 63 | King of Swords | **Kevin（Gru風格）** | Kevin in Gru-like style on high-tech throne, laser sword raised, wind blowing lab coat, mountain of gadgets background |

### 錢幣組 (Pentacles) — 土元素
*錢幣化身為金幣 / 香蕉金幣 / Gru 的財寶*

| ID | 牌名 | 角色 | Prompt 關鍵要素 |
|----|------|------|----------------|
| 64 | Ace of Pentacles | Gru的手套 | One giant gold coin with banana emblem held by Gru's blue-gloved hand from cloud, garden path leading to vault, blooming flowers |
| 65 | Two of Pentacles | **Kevin** | Kevin juggler figure balancing two gold coins, lab equipment around, bank vault in background, multitasking |
| 66 | Three of Pentacles | **Bob + Dave + Carl** | Bob apprentice building a banana-themed machine, three coins on blueprint, Dave and Carl as engineers observing, teamwork |
| 67 | Four of Pentacles | **Dave** | Dave Scrooge-like clutching one coin to chest (loves gadgets and cupcakes — greedy), two under feet, one on head, protective expression |
| 68 | Five of Pentacles | **Bob + Stuart** | Bob and Stuart outside in snow, passing a lit bank window with five coins, poverty and exclusion |
| 69 | Six of Pentacles | **Kevin** | Kevin weighing coins on a scale, giving to poorer Phil, balance of generosity |
| 70 | Seven of Pentacles | **Carl** | Carl leaning on a shovel, looking at seven coins growing on a banana tree, patience and waiting |
| 71 | Eight of Pentacles | **Phil** | Phil craftsman carving coins with banana stamp, tools around, focused work, skill development |
| 72 | Nine of Pentacles | **Agnes風格女性小小兵** | Agnes-inspired female Minion in tropical garden with vineyard of coins, nine coins arranged, pet bird on finger, luxury and self-sufficiency |
| 73 | Ten of Pentacles | **Kevin, Stuart, Bob + Tim（小小兵長老）** | Ten coins in family tree pattern, Tim the elder Minion (grandfather), Kevin, Stuart, Bob as family, archway to home, legacy |
| 74 | Page of Pentacles | **Otto** | Otto standing in gold field, holding a coin like a magnifying glass, curious and studious expression |
| 75 | Knight of Pentacles | **Donny** | Donny riding a slow steady mechanical bull, coin in hand, plowed field of chocolate behind, patient and reliable |
| 76 | Queen of Pentacles | **Lucy風格女性小小兵** | Lucy-inspired female Minion on throne in flower garden, coin on lap, bunny rabbit companion, nurturing |
| 77 | King of Pentacles | **Kevin（Gru風格）** | Kevin in Gru-like style on throne decorated with gold vines, holding giant coin and scepter, bank vault background |

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
