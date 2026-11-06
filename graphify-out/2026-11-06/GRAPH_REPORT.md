# Graph Report - iqmath_student  (2026-11-06)

## Corpus Check
- 791 files · ~4,157,244 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 37 file(s) not represented in the graph (top: .otf 18, .css 6, .glb 4)

## Summary
- 3371 nodes · 10164 edges · 147 communities (90 shown, 57 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8732bc65`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LayoutAdmin
- LigaDashboard.jsx
- h
- QuestionForm.jsx
- dependencies
- echarts-for-react
- useGetQuery
- DiagnosticQuestions.jsx
- Theme.js
- ChatBoxModule.js
- QuestionWorkspace.jsx
- T
- @mui/material
- react-i18next
- SiteStatistics.jsx
- package.json
- s
- usePostQuery
- ProductCard.jsx
- c
- tex-mml-svg.js
- a
- liga/utils.js
- Auth.js
- StudentHome.jsx
- L
- StudentOverview.jsx
- @tabler/icons
- PricingContent.jsx
- BattleArena.jsx
- role-landing/shared.jsx
- StudentTable.jsx
- student/my-study/index.js
- gamesData.js
- footer/index.js
- store/index.js
- i
- GameRenderer.js
- DiagnosticMistakes.jsx
- ChildOverview.jsx
- o
- Q
- ReviewCarousel.js
- LigaTestRun.jsx
- framer-motion
- exceptional-feature/index.js
- [student_id].js
- BattleSetupForm.jsx
- BottomSections.jsx
- LanguageDropdown
- lucide-react
- NewsSingle.jsx
- menuConfig.js
- student/chat/index.js
- ParentConnect.jsx
- next-auth
- next
- LigaTestDetail.jsx
- MessageBubble.jsx
- n
- r
- StudentProfile.jsx
- ParentProfile.jsx
- @dnd-kit/sortable
- HpHeader.js
- TutorProfile.jsx
- menulist.js
- AuthMascot.jsx
- form/index.js
- Theme.js
- MathEditor.jsx
- StudentExampleTable.jsx
- FreeLessons.jsx
- react-icons
- LigaHome.jsx
- key-metric/index.js
- ratings/index.js
- Landing.jsx
- useImageAccentColor.js
- HeaderAlert.js
- SubscriptionPromoModal.jsx
- eslint.config.mjs
- LeadershipSlider.js
- i18n/index.js
- ParentQr.jsx
- ckeditor.js
- RobotWalker.jsx
- react-circular-progressbar
- SubjectsBanner.jsx
- AGENTS.md
- MentalGames.js
- ParentQuickActions.jsx
- ParentStatsGrid.jsx
- BannerHeader.js
- roomTypeProvider.js
- topic-context.js
- .singletonFocus
- LigaWinners
- api/index.js
- devDependencies
- scripts
- StudentExampleDetailLayout.jsx
- Editing this README
- TeacherGroupDetail.jsx
- compilerOptions
- next.config.mjs
- SubjectOld.jsx
- test-calc/index.js
- litsey.js
- litsey_ru.js
- regions_ru.js
- header/index.jsx
- DiagnosticSubjects.jsx
- student/subjects/[id]/index.js

## God Nodes (most connected - your core abstractions)
1. `react` - 449 edges
2. `react-i18next` - 380 edges
3. `lucide-react` - 202 edges
4. `next` - 188 edges
5. `useGetQuery()` - 182 edges
6. `LayoutAdmin()` - 178 edges
7. `a()` - 141 edges
8. `URLS` - 119 edges
9. `T()` - 100 edges
10. `i()` - 100 edges

## Surprising Connections (you probably didn't know these)
- `Index()` --calls--> `EyeIcon()`  [EXTRACTED]
  src/pages/dashboard/parent/results/[id]/index.jsx → public/icons/eyeIcon.jsx
- `Benefits()` --calls--> `LayoutAdmin()`  [EXTRACTED]
  src/pages/dashboard/prices/benifits/index.js → src/layout/LayoutAdmin.jsx
- `Category()` --calls--> `LayoutAdmin()`  [EXTRACTED]
  src/pages/dashboard/prices/category/index.js → src/layout/LayoutAdmin.jsx
- `StudentProfile()` --indirect_call--> `ProfileInfoTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/ProfileInfoTab.jsx
- `StudentProfile()` --indirect_call--> `ReferralTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/ReferralTab.jsx

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (147 total, 57 thin omitted)

### Community 0 - "LayoutAdmin"
Cohesion: 0.07
Nodes (52): next-themes, HeaderTitle(), OnlinePing(), LayoutAdmin(), CoverImage(), MyPurchasedBooks(), STATUS_CONFIG, StatusBadge() (+44 more)

### Community 1 - "LigaDashboard.jsx"
Cohesion: 0.14
Nodes (27): LigaDialog(), TONES, EMPTY_TEST, LigaDashboard(), Overview(), SOURCE_LABELS, TABS, Tests() (+19 more)

### Community 2 - "h"
Cohesion: 0.07
Nodes (11): b(), d(), e(), f(), g(), h(), e(), m() (+3 more)

### Community 3 - "QuestionForm.jsx"
Cohesion: 0.22
Nodes (9): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionModal(), QuestionTypeSelect(), editorConfig, RichTextEditor() (+1 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (76): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+68 more)

### Community 5 - "echarts-for-react"
Cohesion: 0.11
Nodes (5): echarts-for-react, days, heatmapData, hours, DONUT_COLORS

### Community 6 - "useGetQuery"
Cohesion: 0.11
Nodes (24): lodash, next-auth, UserAgreement(), ProfileDetails(), TopicDropdown(), KEYS, URLS, useGetPlans() (+16 more)

### Community 7 - "DiagnosticQuestions.jsx"
Cohesion: 0.15
Nodes (24): html-react-parser, SuccessPopupSendChat(), ActionSolution(), DiagnosticResultModal(), ModalLevel(), readStart(), removeStart(), usePersistentTimer() (+16 more)

### Community 8 - "Theme.js"
Cohesion: 0.23
Nodes (16): Footer(), ContactPage(), BannerFaq(), ScrollToTop(), LayoutHome(), ThemeSettings(), NotFound(), Contact() (+8 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.12
Nodes (20): lucide-react, ChatBoxModule(), ChatHeader(), ROLE_LABELS, ChatAvatar(), ChatsList(), formatDate(), CloseModal() (+12 more)

### Community 10 - "QuestionWorkspace.jsx"
Cohesion: 0.14
Nodes (15): react-mathquill, Calculator(), availableMathSymbols, MathSymbols(), symbolsList, compositeMathStyle, ExamAnswerComposite(), ExamAnswerText() (+7 more)

### Community 12 - "@mui/material"
Cohesion: 0.03
Nodes (12): @mui/material, react, BaseCard(), keys, cardStyle, FeatureCard(), Features(), IconHeader() (+4 more)

### Community 13 - "react-i18next"
Cohesion: 0.08
Nodes (14): @heroui/react, react-i18next, exitImpersonation(), SimpleModal(), SuccessPopup(), Individual(), CreateReferalModal(), SendToMentorModal() (+6 more)

### Community 14 - "SiteStatistics.jsx"
Cohesion: 0.07
Nodes (59): recharts, BarList(), DonutCard(), bucketRange(), NewUsersChart(), TABS, toIso(), CONVERSION_LINES (+51 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (38): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+30 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (3): getFactory(), parseList(), s()

### Community 17 - "usePostQuery"
Cohesion: 0.16
Nodes (28): axios, @ckeditor/ckeditor5-react, DeleteAccountModal(), TEXTS, EditIcon(), QuestionCountIcon(), RightIcon(), TrashIcon() (+20 more)

### Community 18 - "ProductCard.jsx"
Cohesion: 0.10
Nodes (18): dayjs, usePurchasedProducts(), EmptyState(), ErrorState(), ProductCard(), ProductGrid(), StatusBadge(), PurchasedProducts() (+10 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.05
Nodes (23): applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_(), getRule() (+15 more)

### Community 22 - "liga/utils.js"
Cohesion: 0.17
Nodes (25): LigaParticipants(), Participants(), STARTED, LigaHero(), LigaPager(), LigaTable(), PAGE_SIZE, STATUS_COLORS (+17 more)

### Community 23 - "Auth.js"
Cohesion: 0.19
Nodes (17): react-hook-form, SpinnerIcon(), SimpleLoader(), CredentialsPopup(), Auth(), AuthForgetPassword(), AuthNewPassword(), AuthRecieveCode() (+9 more)

### Community 24 - "StudentHome.jsx"
Cohesion: 0.19
Nodes (12): buildMonthGrid(), formatDDMMYYYY(), HomeCalendarCard(), HomeHero(), HomeRecentActivity(), CompletedIcon(), HomeStatsGrid(), THEMES (+4 more)

### Community 26 - "StudentOverview.jsx"
Cohesion: 0.05
Nodes (35): ImpersonationBar(), DefaultSeo(), SEO, SiteTracker(), authSecret, config, reactQueryClient, UserProfileContext (+27 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.15
Nodes (9): @tabler/icons, StyledAccordian, TabEmbedding(), StyledAccordian, TabPayments(), StyledAccordian, TabTeamScheduling(), StyledAccordian (+1 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.18
Nodes (17): closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection(), normalizeTitle(), GameRenderer(), MentalGamePlayPage(), LANGS (+9 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.12
Nodes (23): BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial() (+15 more)

### Community 30 - "role-landing/shared.jsx"
Cohesion: 0.08
Nodes (52): DEFAULT_PRIZES, Heading(), LeagueDetails(), POINT_ICONS, PRIZES, RULE_ICONS, SEASON_ICONS, TEXT (+44 more)

### Community 31 - "StudentTable.jsx"
Cohesion: 0.08
Nodes (48): docx, Chip(), DateInput(), daysAgo(), formatDay(), MoreFilters(), toISO(), Avatar() (+40 more)

### Community 32 - "student/my-study/index.js"
Cohesion: 0.29
Nodes (9): EmptyPage(), ButtonCellRenderer(), GridExample(), MyStudyAcitve(), NavbarStudy(), colDefs, Index(), Index() (+1 more)

### Community 33 - "gamesData.js"
Cohesion: 0.08
Nodes (8): safekidSeeds, cache, handler(), pick(), toTitle(), categoryConfig, MentalGames(), normalizeTitle()

### Community 35 - "store/index.js"
Cohesion: 0.14
Nodes (14): zustand, PremiumCrown(), Main(), MainWrapper(), Navbar(), SearchInput(), NavbarCoins(), NavbarPoints() (+6 more)

### Community 36 - "i"
Cohesion: 0.03
Nodes (4): getSeparator(), i(), merge(), pauseValue()

### Community 37 - "GameRenderer.js"
Cohesion: 0.16
Nodes (16): GameRenderer(), BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle() (+8 more)

### Community 38 - "DiagnosticMistakes.jsx"
Cohesion: 0.12
Nodes (34): AttemptPicker(), AttemptsCarousel(), AttemptsTrendChart(), PAD, RANGES, BalanceCard(), answersOf(), ChoiceRow() (+26 more)

### Community 39 - "ChildOverview.jsx"
Cohesion: 0.05
Nodes (94): DeviceLimitModal(), DeviceIcon(), DeviceRow(), formatDeviceDate(), ICONS, RemoveChildModal(), SwitchToChildButton(), VARIANTS (+86 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.11
Nodes (6): react-slick, slick-carousel, ReviewCarousel(), Reviews, SampleNextArrow(), SamplePrevArrow()

### Community 43 - "LigaTestRun.jsx"
Cohesion: 0.26
Nodes (10): useScreenshotGuard(), LigaGuard(), clock(), LigaTestRun(), MathAnswerField, MJ_CONFIG, Result(), RichText() (+2 more)

### Community 44 - "framer-motion"
Cohesion: 0.14
Nodes (18): framer-motion, InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), fractionsData, groupsPupil, howItWorks, questions (+10 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.11
Nodes (7): ExceptionalFeature(), slide1, slide2, slide3, StyledAnimationContent, StyledAnimationContent2, StyledAnimationFeature

### Community 46 - "[student_id].js"
Cohesion: 0.10
Nodes (28): react-dom, Eye(), buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal() (+20 more)

### Community 47 - "BattleSetupForm.jsx"
Cohesion: 0.13
Nodes (18): SearchInput(), SelectBox(), BattleRatingWidget(), WidgetShell(), BattleRulesCard(), RULES, BattleSetupForm(), getSubjectIcon() (+10 more)

### Community 48 - "BottomSections.jsx"
Cohesion: 0.09
Nodes (55): AppSection(), CtaBanner(), FaqSection(), FEATURE_COLORS, FEATURE_ICONS, MotivationSection(), PILL_COLORS, PILL_ICONS (+47 more)

### Community 49 - "LanguageDropdown"
Cohesion: 0.17
Nodes (14): Flag(), FLAGS, LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), NavbarLangue(), mathConfig (+6 more)

### Community 50 - "lucide-react"
Cohesion: 0.20
Nodes (18): fieldBorder, fieldBox, fieldIcon, fieldInput, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputPhone (+10 more)

### Community 51 - "NewsSingle.jsx"
Cohesion: 0.25
Nodes (14): TEXTS, NewsSingle(), Shell(), TEXTS, FILTERS, NewsAll(), TEXTS, CARD_TEXTS (+6 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.23
Nodes (8): DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil(), createMenuConfig()

### Community 53 - "student/chat/index.js"
Cohesion: 0.25
Nodes (8): ChatEmptyState(), ChatFilters(), ChatPagination(), ChatRequestCard(), ChatRequestList(), useChatData(), useStatusUtils(), ChatPage()

### Community 54 - "ParentConnect.jsx"
Cohesion: 0.16
Nodes (20): ActingParentBar(), AuthButton(), AuthSignIn(), BrandMark(), api, errorText(), Field(), formatPhone() (+12 more)

### Community 55 - "next-auth"
Cohesion: 0.12
Nodes (19): EyeIcon(), @dnd-kit/core, ContentLoader(), ChildNotFoundState(), ChildDetail(), ReferralTab(), StudentRewardModal(), StudentSubjectsList() (+11 more)

### Community 56 - "next"
Cohesion: 0.15
Nodes (14): next, DashboardNav(), Dashboard(), MainContentHead(), MainContent(), MenuSection(), ProfileSection(), Sidebar() (+6 more)

### Community 57 - "LigaTestDetail.jsx"
Cohesion: 0.19
Nodes (20): SectionHead(), emptyQuestion(), LETTERS, LigaTestDetail(), MathEditor, Questions(), Results(), answerHtml() (+12 more)

### Community 58 - "MessageBubble.jsx"
Cohesion: 0.17
Nodes (11): IndependentResultCard(), formatClock(), LinkRow(), MessageBubble(), ReplyButton(), dayKey(), formatDay(), MessagesList() (+3 more)

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.10
Nodes (24): swiper, CoinsIcon(), CouponsList(), CouponUsersList(), EmptyUserState(), CoinConvert(), RATES, StudentProfile() (+16 more)

### Community 62 - "ParentProfile.jsx"
Cohesion: 0.24
Nodes (10): ParentChangePasswordModal(), ParentEditInfoModal(), ParentProfileHero(), ParentProfileInfoCard(), Row(), ActionRow(), ParentProfileQuickActions(), ParentProfileSecurityCard() (+2 more)

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.35
Nodes (6): @dnd-kit/sortable, @dnd-kit/utilities, DndList(), SortableItem(), DragIcon(), SortableTableRow()

### Community 64 - "HpHeader.js"
Cohesion: 0.29
Nodes (9): AppBarStyled, defaultLinks, DrawerHeader, HpHeader(), socialIcons, ToolbarStyled, MobileSidebar(), Navigations() (+1 more)

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.09
Nodes (26): DeleteAccountCard(), TEXTS, normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX (+18 more)

### Community 66 - "menulist.js"
Cohesion: 0.22
Nodes (12): Brand(), ProductsIcon(), getMenuItems(), MenuType, CouponModal(), Sidebar(), SidebarFooter(), SidebarLogo() (+4 more)

### Community 67 - "AuthMascot.jsx"
Cohesion: 0.31
Nodes (9): InputPassword, AuthCard(), Logo(), AuthMascot(), Eye(), PHRASES, useAuthMascot, Wing() (+1 more)

### Community 68 - "form/index.js"
Cohesion: 0.27
Nodes (4): Address(), ShapeBg, Form(), numbers

### Community 69 - "Theme.js"
Cohesion: 0.19
Nodes (9): components(), DarkThemeColors, baseDarkTheme, baselightTheme, LightThemeColors, darkshadows, shadows, buildTheme() (+1 more)

### Community 70 - "MathEditor.jsx"
Cohesion: 0.26
Nodes (9): KEYS, MATH_FIELD_CONFIG, closeBrace(), commandEnd(), MathEditor(), serialize(), splitBare(), splitBy() (+1 more)

### Community 71 - "StudentExampleTable.jsx"
Cohesion: 0.29
Nodes (7): ag-grid-community, ag-grid-react, react-paginate, Pagination(), ActivityTable(), StudentExamplePagination(), StudentExampleTable()

### Community 73 - "FreeLessons.jsx"
Cohesion: 0.29
Nodes (9): formatDateTime(), formatPhone(), FreeLessons(), LeadRow(), pad(), STATUS_KEYS, STATUS_STYLE, TEXTS (+1 more)

### Community 74 - "react-icons"
Cohesion: 0.11
Nodes (11): react-icons, MultiplicationModal(), numbers, NavbarMultiplication(), BookCard(), BuyBookModal(), nf(), PayPill() (+3 more)

### Community 75 - "LigaHome.jsx"
Cohesion: 0.36
Nodes (7): LigaSeasonEmpty(), Countdown(), formatDate(), LigaHome(), TestRow(), TEXT, Index()

### Community 76 - "key-metric/index.js"
Cohesion: 0.24
Nodes (8): Banner(), FEATURES, formatCount(), highlightBrand(), KeyMetric(), splitParagraphs(), TEXTS, AboutUs()

### Community 77 - "ratings/index.js"
Cohesion: 0.28
Nodes (6): AVATAR_COLORS, COUNTS, getAvatarColor(), getInitial(), InitialAvatar(), PODIUM_STYLES

### Community 78 - "Landing.jsx"
Cohesion: 0.11
Nodes (22): AppStoreButtons(), Benefits(), CARD_STYLES, TEXTS, HomePage(), ChatBubble(), FAQ(), isYoutube() (+14 more)

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "HeaderAlert.js"
Cohesion: 0.36
Nodes (4): HeaderAlert(), NotificationBg, NotificationBg2, NotificationBg3

### Community 81 - "SubscriptionPromoModal.jsx"
Cohesion: 0.08
Nodes (28): @mui/icons-material, AVATAR_COLORS, DetailItem(), ParentChildrenCard(), CouponSection(), ModalHeader(), NASIYA_TERMS, NasiyaInstallmentOption() (+20 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 83 - "LeadershipSlider.js"
Cohesion: 0.32
Nodes (6): Leadership(), TEXTS, leadershipApi, LeadershipSlider(), mathJaxConfig, PROFESSIONS

### Community 85 - "ParentQr.jsx"
Cohesion: 0.11
Nodes (22): qrcode.react, APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, LOGO_URL, Corner(), FeatureCard(), FEATURES (+14 more)

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 87 - "RobotWalker.jsx"
Cohesion: 0.47
Nodes (4): three, random(), RobotWalker(), stripRootMotion()

### Community 92 - "MentalGames.js"
Cohesion: 0.29
Nodes (6): CATEGORY_ICONS, FILTERS, GAME_INFO, MentalGames(), TEXTS, titleOf()

### Community 95 - "BannerHeader.js"
Cohesion: 0.60
Nodes (3): AuthLanding(), BannerHeader(), LandingPage()

### Community 101 - "api/index.js"
Cohesion: 0.07
Nodes (30): @heroicons/react, react-hot-toast, @tanstack/react-query, NEWS, newsApi, NewsPage(), newsApi, NewsSlider() (+22 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 109 - "StudentExampleDetailLayout.jsx"
Cohesion: 0.14
Nodes (11): better-react-mathjax, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), StudentExampleDetailLayout(), parseHtml(), StudentExampleQuestionList() (+3 more)

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.12
Nodes (32): UngroupedStudentsModal(), GROUPS_PATH, TEACHER_GROUP_KEYS, TeacherGroupDetail(), StatTile(), TeacherGroups(), AddStudentsModal(), ConfirmModal() (+24 more)

### Community 124 - "SubjectOld.jsx"
Cohesion: 0.14
Nodes (20): react-player, Button(), CloseIcon(), VideoPlayer(), useDeleteQuestion(), ConfirmPurchaseModal(), PurchaseSuccessModal(), Products() (+12 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.22
Nodes (7): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, Index(), MathKeyboard

### Community 165 - "header/index.jsx"
Cohesion: 0.24
Nodes (9): Header(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), ADDRESS_MAP_URL, SOCIAL_LINKS (+1 more)

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.07
Nodes (42): CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME, ModalConfidentiality(), SectionHeader(), StatsCarousel() (+34 more)

### Community 175 - "student/subjects/[id]/index.js"
Cohesion: 0.12
Nodes (20): BaseBreadcrumbs(), ChartIcon(), ClockIcon(), formatDuration(), ListIcon(), ReactPlayer, StatTile(), TopicDetail() (+12 more)

## Knowledge Gaps
- **33 isolated node(s):** `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image`, `@ckeditor/ckeditor5-source-editing`, `@ckeditor/ckeditor5-special-characters` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1014 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **57 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `@mui/material` to `LayoutAdmin`, `LigaDashboard.jsx`, `QuestionForm.jsx`, `echarts-for-react`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `react-i18next`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `liga/utils.js`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `gamesData.js`, `footer/index.js`, `store/index.js`, `GameRenderer.js`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `student/chat/index.js`, `ParentConnect.jsx`, `next-auth`, `next`, `LigaTestDetail.jsx`, `MessageBubble.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `@dnd-kit/sortable`, `HpHeader.js`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `form/index.js`, `Theme.js`, `MathEditor.jsx`, `StudentExampleTable.jsx`, `PaymentMethods.js`, `FreeLessons.jsx`, `react-icons`, `LigaHome.jsx`, `key-metric/index.js`, `ratings/index.js`, `Landing.jsx`, `useImageAccentColor.js`, `HeaderAlert.js`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `ParentQr.jsx`, `RobotWalker.jsx`, `react-circular-progressbar`, `MentalGames.js`, `BannerHeader.js`, `roomTypeProvider.js`, `topic-context.js`, `api/index.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`, `test-calc/index.js`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **What connects `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LayoutAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.06759259259259259 - nodes in this community are weakly interconnected._
- **Why does `react-i18next` connect `react-i18next` to `LayoutAdmin`, `QuestionForm.jsx`, `echarts-for-react`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `gamesData.js`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `DiagnosticSubjects.jsx`, `[student_id].js`, `student/subjects/[id]/index.js`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `BattleSetupForm.jsx`, `student/chat/index.js`, `ParentConnect.jsx`, `next-auth`, `next`, `MessageBubble.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `HpHeader.js`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `StudentExampleTable.jsx`, `FreeLessons.jsx`, `react-icons`, `LigaHome.jsx`, `key-metric/index.js`, `ratings/index.js`, `Landing.jsx`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `i18n/index.js`, `ParentQr.jsx`, `react-circular-progressbar`, `SubjectsBanner.jsx`, `MentalGames.js`, `ParentQuickActions.jsx`, `ParentStatsGrid.jsx`, `api/index.js`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `LigaDashboard.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14193548387096774 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `ChatBoxModule.js` to `LayoutAdmin`, `LigaDashboard.jsx`, `QuestionForm.jsx`, `useGetQuery`, `DiagnosticQuestions.jsx`, `Theme.js`, `QuestionWorkspace.jsx`, `@mui/material`, `react-i18next`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `liga/utils.js`, `Auth.js`, `StudentHome.jsx`, `StudentOverview.jsx`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `DiagnosticSubjects.jsx`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `ParentConnect.jsx`, `next-auth`, `LigaTestDetail.jsx`, `MessageBubble.jsx`, `StudentProfile.jsx`, `ParentProfile.jsx`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `FreeLessons.jsx`, `LigaHome.jsx`, `key-metric/index.js`, `ratings/index.js`, `Landing.jsx`, `SubscriptionPromoModal.jsx`, `LeadershipSlider.js`, `ParentQr.jsx`, `SubjectsBanner.jsx`, `MentalGames.js`, `ParentQuickActions.jsx`, `ParentStatsGrid.jsx`, `api/index.js`, `TeacherGroupDetail.jsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06533646322378717 - nodes in this community are weakly interconnected._