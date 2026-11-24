# Task: show the full FAQ on the home page and add 10 new questions (25 total)

Project: Astro site on `http://localhost:4321`, Ukrainian language, honey shop "Медова Банка" (family apiary of the Kryvtsov family, Sumy region). Do not change anything outside the FAQ feature (data, home FAQ block, FAQ page, FAQ JSON-LD, llms files if they contain the FAQ).

## Current state

- The FAQ data has **15** questions (the original 6 + 9 added earlier). The home page shows only the first 6 plus an "Усі питання" button leading to the full FAQ page.
- Existing topics (do not duplicate them): how to order; is the honey fresh; sugar/additives; differences between linden, sunflower and mixed-flower honey; why honey crystallizes; storage; how to tell natural honey from fake; 1 L vs 3 L; honey for children; several kinds in one order; contacts and working hours; how delivery works; self-pickup in Sumy; how to pay; what to do if the parcel is damaged.

## Step 1: competitor review (to confirm the topic gaps)

Review the FAQ and the SEO text blocks of these three competitors, with whatever browsing tool you have:

1. https://pravdyvo.com/med/
2. https://e-bee.com.ua/myod/sumy/
3. https://smakmedu.com.ua/ua/produkti-pchelovodstva/mjod/

Notes for you: the e-bee.com.ua page was already reviewed. Its FAQ is short (where to buy, quality guarantee, kinds of honey, delivery across Ukraine, storage), and its text stresses: honey direct from beekeepers without middlemen, no sugar/additives/heating, packaging from 250 g to 3 L, retail and wholesale, free delivery above a threshold, a "how to order" step list, and one-line claims about each kind of honey. The other two sites blocked automated requests during preparation, so check them yourself. If you cannot open them, skip them and say so in the final report.

What to do with the review:
- Check that the 10 questions below cover the gaps (weight/volume, packaging, price, wholesale, quality guarantee, usage, allergy, heating, decrystallization, availability). If a competitor clearly answers a frequent customer question that is **not** covered by the 15 existing + 10 new ones, you may replace one of the new ones, but keep the total at exactly **25**, and list the change in the report.
- **Do not copy competitor text.** Write all answers in your own words, in the voice of this site.
- Do not copy health claims such as "treats colds" or "cures ...". The site must not make medical claims.

## Step 2: add 10 new questions and answers

Add these to the single FAQ data source, **after** the existing 15, in this order. Texts are final Ukrainian copy; keep them as written unless a fact on the site contradicts them (then fix the text and report it). Where a `TODO` comment is marked, put the comment in the code next to the item (not in the visible text).

1. **Q:** Скільки кілограмів меду в банці 1 л і відрі 3 л?
   **A:** Мед важчий за воду, тому літр меду важить приблизно 1,4 кг, а 3 літри — близько 4,2 кг. Точна вага трохи залежить від сорту та вологості меду.

2. **Q:** У якій тарі ви продаєте мед?
   **A:** Ми фасуємо мед у банки по 1 л і відра по 3 л. Матеріал можна обрати за бажанням: скло або харчовий пластик. Повідомте про свій вибір під час замовлення або консультації.

3. **Q:** Скільки коштує мед і від чого залежить ціна?
   **A:** Ціни для кожного сорту вказані в картках товарів на сайті, окремо для 1 л і 3 л. Вартість залежить від сорту та обсягу. Відро 3 л зазвичай вигідніше за три окремі банки по 1 л.
   *Implementation note:* this answer must not hardcode prices. Verify against the product data that the 3 L price per litre is really lower for every kind; if not, remove the last sentence.

4. **Q:** Як розкристалізувати мед, якщо він загусник?
   **A:** Поставте банку в теплу водяну баню (до приблизно 40 °C) і час від часу помішуйте. Не кип'ятіть мед і не грійте його в мікрохвильовці: перегрів псує смак, аромат і властивості меду.
   *(Fix the typo in the question: it must read "якщо він загусник" → "якщо він загус".)*

5. **Q:** Чи можна додавати мед у гарячий чай?
   **A:** Краще додавати мед у теплий напій, який вже трохи охолов (до приблизно 40 °C), а не в окріп. Висока температура погіршує аромат і властивості меду. Простіше вживати його окремо, ложкою, і запивати чаєм.

6. **Q:** Скільки меду можна вживати щодня?
   **A:** Мед дуже калорійний, тому вживати його варто помірно: для дорослої людини зазвичай достатньо 1–2 столових ложок на день. Якщо у вас цукровий діабет або особлива дієта, порадьтеся з лікарем.

7. **Q:** Чи може бути алергія на мед?
   **A:** Так, у людей з алергією на пилок або продукти бджільництва можлива реакція. Якщо ви раніше мали таку реакцію, спершу порадьтеся з лікарем. За перших ознак алергії припиніть вживання меду.

8. **Q:** Чи можна купити мед оптом або великою партією?
   **A:** Так, ми готові обговорити більші замовлення. Залиште заявку у формі або зателефонуйте нам — розкажемо про наявність і умови.
   *TODO: confirm wholesale terms with the owner.*

9. **Q:** Яку якість меду ви гарантуєте?
   **A:** Це мед із нашої власної пасіки, урожаю 2026 року. Ми збираємо його невеликими партіями, не додаємо цукор чи інші домішки. Перед замовленням ви можете запитати про сорт, смак і походження меду, і ми відповімо.
   *TODO: if the owner has lab test results or certificates, add one more sentence about them. Do not invent any.*

10. **Q:** Коли буде новий урожай і що робити, якщо потрібний сорт закінчився?
    **A:** Ми продаємо тільки мед поточного врожаю і збираємо його невеликими партіями, тому окремий сорт може закінчитися. Перед замовленням уточніть наявність у консультації. Терміни наступного збору залежать від погоди та медозбору.

Rules for all new items: plain Ukrainian, no medical or "cure" claims, no invented facts (no lab certificates, no exact delivery prices, no discount terms).

## Step 3: show the full FAQ on the home page

- The home page FAQ block must now show **all 25** questions, not 6.
- Remove the "Усі питання" button from the home page (there is nothing more to open). Keep the dedicated FAQ page (`/faq/` or the current route) working, listing the same 25 items, because it is linked from the menu and footer and is useful for SEO. Both pages must read from the same data source.
- With 25 items a flat list is too long. Group the questions with small headings, keeping the accordion (`<details>`/`<summary>` or the existing component) inside each group:
  1. **Замовлення, доставка та оплата** (how to order, payment, delivery, self-pickup, damaged parcel, several kinds in one order, contacts and hours, wholesale, availability/new harvest, price)
  2. **Про мед і його якість** (fresh honey, sugar/additives, kinds, natural vs fake, quality guarantee, weight, packaging, 1 L vs 3 L)
  3. **Зберігання та користь** (crystallization, how to decrystallize, storage, hot tea, daily amount, allergy, honey for children)
  Add a `group` field to the FAQ data items and render by group. Keep the original order inside each group.
- Keep all answers collapsed by default. Keyboard accessible, visible focus state, proper `aria` handled by `<details>`.
- Keep the page fast: no heavy JS for the accordion; the answers stay in the HTML (not loaded on click), so search engines and LLMs can read them.
- Keep the current visual style (cards, brown headings). Add small group headings in the site's heading font.
- Optional, only if cheap: a link from the home FAQ heading area to the same questions on the FAQ page is **not** needed; do not add duplicate navigation.

## Step 4: structured data and AI files

- The `FAQPage` JSON-LD on the home page and on the FAQ page must contain **all 25** items, generated from the same data source; the text must match the visible text exactly (no HTML differences in meaning). One `FAQPage` block per page, no duplicates.
- If `llms.txt` / `llms-full.txt` exist and include the FAQ, they must reflect all 25 items (generated from the same data if possible).
- If a sitemap or meta description mentions the number of questions, update it.

## Definition of done

- FAQ data source has exactly 25 items (15 existing unchanged + 10 new, in the order above), each with `group`, `question`, `answer`.
- The home page shows all 25 in 3 groups, collapsed by default, with no "Усі питання" button. The FAQ page shows the same 25.
- JSON-LD on both pages has 25 valid `Question`/`Answer` pairs. Validate and report the result.
- `npm run build` passes; layout is correct at 360px, 768px, 1280px+.
- Final report: files changed, the result of the competitor review (which sites you could and could not open), any item you replaced or changed, and every `TODO` left for the owner (wholesale terms, quality documents, next harvest timing).
