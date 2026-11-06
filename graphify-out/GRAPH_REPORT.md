# Graph Report - iqmath_student  (2026-11-06)

## Corpus Check
- 791 files · ~4,157,949 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 37 file(s) not represented in the graph (top: .otf 18, .css 6, .glb 4)

## Summary
- 3372 nodes · 10166 edges · 153 communities (99 shown, 54 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e49dedb7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LayoutAdmin
- LigaDashboard.jsx
- h
- QuestionForm.jsx
- dependencies
- react
- useGetQuery
- SubjectQuestions.jsx
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
- @heroui/react
- L
- _app.js
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
- ContentLoader
- next
- LigaTestDetail.jsx
- MessageBubble.jsx
- n
- r
- StudentProfile.jsx
- store/index.js
- @dnd-kit/sortable
- HpHeader.js
- TutorProfile.jsx
- menulist.js
- AuthMascot.jsx
- form/index.js
- SwitchToChildButton.jsx
- MathEditor.jsx
- StudentExampleTable.jsx
- FreeLessons.jsx
- react-icons
- LigaDashboard.jsx
- key-metric/index.js
- ratings/index.js
- powerful-dozens/index.js
- useImageAccentColor.js
- MyChildren.jsx
- SubscriptionPromoModal.jsx
- eslint.config.mjs
- wrapAnswer.js
- i18n/index.js
- app.js
- ckeditor.js
- RobotWalker.jsx
- react-circular-progressbar
- uzbekistan-map/index.jsx
- AGENTS.md
- history/index.js
- [id]/index.jsx
- dummy-data/index.js
- library/[id]/index.js
- [...nextauth].js
- CouponUsersList.jsx
- .singletonFocus
- LigaWinners
- ProductsExchange.jsx
- api/index.js
- devDependencies
- scripts
- TrialSettings.jsx
- CoinsTab.jsx
- MultiplicationModal.jsx
- ParentQr
- ImpersonationBar.jsx
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
- `StudentProfile()` --indirect_call--> `CoinsTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/CoinsTab.jsx
- `StudentProfile()` --indirect_call--> `CouponsTab()`  [INFERRED]
  src/modules/student/profile/StudentProfile.jsx → src/modules/student/profile/tabs/CouponsTab.jsx
- `DeleteAccountCard()` --calls--> `DeleteAccountModal()`  [EXTRACTED]
  src/components/account/DeleteAccountCard.jsx → src/components/account/DeleteAccountModal.jsx
- `ProfileInfoTab()` --calls--> `DeleteAccountCard()`  [EXTRACTED]
  src/modules/student/profile/tabs/ProfileInfoTab.jsx → src/components/account/DeleteAccountCard.jsx

## Import Cycles
- 2-file cycle: `src/hooks/index.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js`
- 3-file cycle: `src/hooks/api/usePurchasedProducts.js -> src/hooks/useRoleDetection.js -> src/hooks/index.js -> src/hooks/api/usePurchasedProducts.js`

## Communities (153 total, 54 thin omitted)

### Community 0 - "LayoutAdmin"
Cohesion: 0.09
Nodes (37): HeaderTitle(), OnlinePing(), Individual(), LayoutAdmin(), StudentInvitationsModal(), LigaHome(), SubjectBreadcrumbs(), PaymentTable() (+29 more)

### Community 1 - "LigaDashboard.jsx"
Cohesion: 0.24
Nodes (15): LigaDialog(), TONES, Tests(), PRIZE_FIELDS, PRIZES, SeasonEditDialog(), WEEK_FIELDS, WeekEditDialog() (+7 more)

### Community 2 - "h"
Cohesion: 0.07
Nodes (11): b(), d(), e(), f(), g(), h(), e(), m() (+3 more)

### Community 3 - "QuestionForm.jsx"
Cohesion: 0.22
Nodes (9): ChoiceAnswerInput(), CompositeAnswerInput(), ImageChoiceInput(), QuestionForm(), QuestionModal(), QuestionTypeSelect(), editorConfig, RichTextEditor() (+1 more)

### Community 4 - "dependencies"
Cohesion: 0.03
Nodes (76): dependencies, ag-grid-community, @ag-grid-community/client-side-row-model, ag-grid-react, apexcharts, autoprefixer, axios, better-react-mathjax (+68 more)

### Community 5 - "react"
Cohesion: 0.03
Nodes (13): echarts-for-react, react, RoomContext, TopicContext, ChatEmptyState(), ChatRequestCard(), ChatRequestList(), days (+5 more)

### Community 6 - "useGetQuery"
Cohesion: 0.07
Nodes (46): lodash, next-auth, swiper, UserAgreement(), ProfileDetails(), TopicDropdown(), KEYS, URLS (+38 more)

### Community 7 - "SubjectQuestions.jsx"
Cohesion: 0.11
Nodes (25): framer-motion, SimpleModal(), SuccessPopup(), SuccessPopupSendChat(), useGetPlans(), BookCard(), BuyBookModal(), nf() (+17 more)

### Community 8 - "Theme.js"
Cohesion: 0.07
Nodes (45): Footer(), AuthLanding(), ContactPage(), BannerFaq(), Benefits(), CARD_STYLES, TEXTS, ChatBubble() (+37 more)

### Community 9 - "ChatBoxModule.js"
Cohesion: 0.15
Nodes (15): ChatBoxModule(), ChatHeader(), ROLE_LABELS, ChatAvatar(), ChatsList(), formatDate(), CloseModal(), EmptyMessage() (+7 more)

### Community 10 - "QuestionWorkspace.jsx"
Cohesion: 0.17
Nodes (15): react-mathquill, Calculator(), compositeMathStyle, ExamAnswerComposite(), ExamAnswerText(), textMathStyle, mathConfig, plainLength() (+7 more)

### Community 12 - "@mui/material"
Cohesion: 0.04
Nodes (11): @mui/material, BaseCard(), keys, cardStyle, FeatureCard(), Features(), IconHeader(), images (+3 more)

### Community 13 - "react-i18next"
Cohesion: 0.11
Nodes (21): react-i18next, CreateReferalModal(), Friends(), RANK_STYLES, StatisticsHero(), GROUP_ICON_BG, progressColor(), TutorGroupsCard() (+13 more)

### Community 14 - "SiteStatistics.jsx"
Cohesion: 0.08
Nodes (55): recharts, BarList(), DonutCard(), bucketRange(), NewUsersChart(), TABS, toIso(), CONVERSION_LINES (+47 more)

### Community 15 - "package.json"
Cohesion: 0.05
Nodes (37): name, private, version, @ag-grid-community/client-side-row-model, apexcharts, autoprefixer, @ckeditor/ckeditor5-build-classic, @ckeditor/ckeditor5-image (+29 more)

### Community 16 - "s"
Cohesion: 0.05
Nodes (3): getFactory(), parseList(), s()

### Community 17 - "usePostQuery"
Cohesion: 0.17
Nodes (24): DeleteAccountModal(), TEXTS, RightIcon(), TrashIcon(), ImageUploader(), Input(), AnimateUp(), postRequest() (+16 more)

### Community 18 - "ProductCard.jsx"
Cohesion: 0.11
Nodes (19): dayjs, EmptyState(), ErrorState(), LoadingState(), ProductCard(), ProductGrid(), StatusBadge(), PurchasedProducts() (+11 more)

### Community 20 - "tex-mml-svg.js"
Cohesion: 0.05
Nodes (23): applyConstraint(), applyCustomQuery(), applyQuery(), applySelector(), bt(), constructor(), createNode_(), getRule() (+15 more)

### Community 22 - "liga/utils.js"
Cohesion: 0.17
Nodes (23): LigaParticipants(), Participants(), STARTED, LigaPager(), LigaTable(), PAGE_SIZE, STATUS_COLORS, LigaStandings() (+15 more)

### Community 23 - "Auth.js"
Cohesion: 0.22
Nodes (20): react-hook-form, InputPassword, InputPhone, SelectRole(), SpinnerIcon(), SimpleLoader(), CredentialsPopup(), Auth() (+12 more)

### Community 24 - "@heroui/react"
Cohesion: 0.19
Nodes (11): @heroicons/react, @heroui/react, useDeleteQuery(), CouponCard(), CouponsList(), EmptyCuponState(), CouponsTab(), CreateReferralModal() (+3 more)

### Community 26 - "_app.js"
Cohesion: 0.17
Nodes (11): ImpersonationBar(), DefaultSeo(), SEO, SiteTracker(), reactQueryClient, UserProfileContext, UserProfileProvider(), App() (+3 more)

### Community 27 - "@tabler/icons"
Cohesion: 0.10
Nodes (13): @tabler/icons, StyledAccordian, TabEmbedding(), StyledAccordian, TabPayments(), StyledAccordian, TabTeamScheduling(), StyledAccordian (+5 more)

### Community 28 - "PricingContent.jsx"
Cohesion: 0.15
Nodes (21): closeAuthModal(), openAuthWithReturn(), AuthModal(), GamesSection(), normalizeTitle(), GameRenderer(), MentalGamePlayPage(), CATEGORY_ICONS (+13 more)

### Community 29 - "BattleArena.jsx"
Cohesion: 0.10
Nodes (29): BattleArena(), BattleChat(), BattleLevelBadge(), LEVEL_COLORS, AVATAR_COLORS, BattlePlayerAvatar(), getColor(), getInitial() (+21 more)

### Community 30 - "role-landing/shared.jsx"
Cohesion: 0.08
Nodes (52): DEFAULT_PRIZES, Heading(), LeagueDetails(), POINT_ICONS, PRIZES, RULE_ICONS, SEASON_ICONS, TEXT (+44 more)

### Community 31 - "StudentTable.jsx"
Cohesion: 0.08
Nodes (49): docx, Chip(), DateInput(), daysAgo(), formatDay(), MoreFilters(), toISO(), Avatar() (+41 more)

### Community 32 - "student/my-study/index.js"
Cohesion: 0.30
Nodes (8): EmptyPage(), ButtonCellRenderer(), MyStudyAcitve(), NavbarStudy(), colDefs, Index(), Index(), useMyStudyStore

### Community 33 - "gamesData.js"
Cohesion: 0.08
Nodes (5): safekidSeeds, cache, handler(), pick(), toTitle()

### Community 35 - "store/index.js"
Cohesion: 0.18
Nodes (13): PremiumCrown(), Main(), MainWrapper(), Navbar(), SearchInput(), NavbarCoins(), NavbarPoints(), NavbarProfile() (+5 more)

### Community 36 - "i"
Cohesion: 0.03
Nodes (4): getSeparator(), i(), merge(), pauseValue()

### Community 37 - "GameRenderer.js"
Cohesion: 0.09
Nodes (26): GameRenderer(), BiggerSmaller(), rand(), FocusClick(), LogicSequence(), rand(), MemoryCards(), shuffle() (+18 more)

### Community 38 - "DiagnosticMistakes.jsx"
Cohesion: 0.11
Nodes (35): ActionSolution(), AttemptPicker(), AttemptsCarousel(), AttemptsTrendChart(), PAD, RANGES, BalanceCard(), answersOf() (+27 more)

### Community 39 - "ChildOverview.jsx"
Cohesion: 0.07
Nodes (76): qrcode.react, ChildHero(), InfoChip(), ChaptersCard(), ChildOverview(), TABS, BrowserIcon(), browserOs() (+68 more)

### Community 42 - "ReviewCarousel.js"
Cohesion: 0.11
Nodes (6): react-slick, slick-carousel, ReviewCarousel(), Reviews, SampleNextArrow(), SamplePrevArrow()

### Community 43 - "LigaTestRun.jsx"
Cohesion: 0.17
Nodes (13): KEYS, MATH_FIELD_CONFIG, useScreenshotGuard(), LigaGuard(), clock(), LigaTestRun(), MathAnswerField, MJ_CONFIG (+5 more)

### Community 44 - "framer-motion"
Cohesion: 0.21
Nodes (12): InfoCircleIcon(), SimpleModalTeacher(), WarningModal(), InfoWarning(), ActionInfo(), SubjectHeader(), buttons, Index() (+4 more)

### Community 45 - "exceptional-feature/index.js"
Cohesion: 0.11
Nodes (7): ExceptionalFeature(), slide1, slide2, slide3, StyledAnimationContent, StyledAnimationContent2, StyledAnimationFeature

### Community 46 - "[student_id].js"
Cohesion: 0.19
Nodes (17): Eye(), DailyTaskDetailModal(), buildApiParams(), DailyTasksPage(), formatScore(), getCurrentWeek(), getDaysInRange(), getLocalizedName() (+9 more)

### Community 47 - "BattleSetupForm.jsx"
Cohesion: 0.18
Nodes (13): BattleRatingWidget(), WidgetShell(), BattleRulesCard(), RULES, BattleSetupForm(), getSubjectIcon(), GRADE_ICON_STYLE, QUESTION_COUNT_OPTIONS (+5 more)

### Community 48 - "BottomSections.jsx"
Cohesion: 0.09
Nodes (55): AppSection(), CtaBanner(), FaqSection(), FEATURE_COLORS, FEATURE_ICONS, MotivationSection(), PILL_COLORS, PILL_ICONS (+47 more)

### Community 49 - "LanguageDropdown"
Cohesion: 0.26
Nodes (9): Flag(), FLAGS, LanguageDropdown(), languages, useKeyboardShortcut(), LayoutQuestion(), formatTime(), QuestionTopBar() (+1 more)

### Community 50 - "lucide-react"
Cohesion: 0.20
Nodes (16): fieldBorder, fieldBox, fieldIcon, fieldInput, countDigitsBeforeCursor(), formatPhone(), getDigits(), InputText (+8 more)

### Community 51 - "NewsSingle.jsx"
Cohesion: 0.24
Nodes (15): HomePage(), TEXTS, NewsSingle(), Shell(), TEXTS, FILTERS, NewsAll(), TEXTS (+7 more)

### Community 52 - "menuConfig.js"
Cohesion: 0.21
Nodes (9): DiagnosticsIcon(), GraduationHatIcon(), IndividualIcon(), ProductsIcon(), PupilProfileIcon(), StudentExamplesIcon(), SubjectIcon(), TeacherPupil() (+1 more)

### Community 53 - "student/chat/index.js"
Cohesion: 0.39
Nodes (5): ChatFilters(), ChatPagination(), useChatData(), useStatusUtils(), ChatPage()

### Community 54 - "ParentConnect.jsx"
Cohesion: 0.20
Nodes (14): BrandMark(), LOGO_URL, api, errorText(), Field(), formatPhone(), ParentConnect(), PasswordField() (+6 more)

### Community 55 - "ContentLoader"
Cohesion: 0.13
Nodes (21): clsx, ContentLoader(), NoActivityState(), ChildDetail(), StudentRewardModal(), StudentSubjectsList(), ACTION_STYLES, Card() (+13 more)

### Community 56 - "next"
Cohesion: 0.14
Nodes (11): next, next-themes, DashboardNav(), Dashboard(), MainContentHead(), MainContent(), MenuSection(), ProfileSection() (+3 more)

### Community 57 - "LigaTestDetail.jsx"
Cohesion: 0.23
Nodes (16): SectionHead(), emptyQuestion(), LETTERS, LigaTestDetail(), Questions(), answerHtml(), escapeHtml(), FileImage() (+8 more)

### Community 58 - "MessageBubble.jsx"
Cohesion: 0.17
Nodes (11): IndependentResultCard(), formatClock(), LinkRow(), MessageBubble(), ReplyButton(), dayKey(), formatDay(), MessagesList() (+3 more)

### Community 61 - "StudentProfile.jsx"
Cohesion: 0.15
Nodes (17): StudentProfile(), TEXT, CoinsHistoryTab(), DevicesTab(), FinesTab(), PaymentsTab(), InfoRow(), ProfileInfoTab() (+9 more)

### Community 62 - "store/index.js"
Cohesion: 0.22
Nodes (4): zustand, NavbarLangue(), useLangStore, useSettingsStore

### Community 63 - "@dnd-kit/sortable"
Cohesion: 0.35
Nodes (6): @dnd-kit/sortable, @dnd-kit/utilities, DndList(), SortableItem(), DragIcon(), SortableTableRow()

### Community 64 - "HpHeader.js"
Cohesion: 0.14
Nodes (18): Brand(), LANGS, RoleChooser(), ROLES, TEXT, AppBarStyled, defaultLinks, DrawerHeader (+10 more)

### Community 65 - "TutorProfile.jsx"
Cohesion: 0.19
Nodes (13): DeleteAccountCard(), TEXTS, TutorProfileActivity(), initialsOf(), TutorProfileHero(), Row(), TutorProfileInfo(), TutorProfileQuickLinks() (+5 more)

### Community 66 - "menulist.js"
Cohesion: 0.42
Nodes (7): CouponModal(), Sidebar(), SidebarFooter(), SidebarPlan(), logout(), useCouponStore, usePricingModalStore

### Community 67 - "AuthMascot.jsx"
Cohesion: 0.29
Nodes (9): AuthCard(), Logo(), AuthMascot(), Eye(), PHRASES, useAuthMascot, Wing(), WINGS (+1 more)

### Community 68 - "form/index.js"
Cohesion: 0.27
Nodes (4): Address(), ShapeBg, Form(), numbers

### Community 69 - "SwitchToChildButton.jsx"
Cohesion: 0.24
Nodes (11): ActingParentBar(), DeviceLimitModal(), DeviceIcon(), DeviceRow(), formatDeviceDate(), ICONS, SwitchToChildButton(), VARIANTS (+3 more)

### Community 70 - "MathEditor.jsx"
Cohesion: 0.39
Nodes (8): closeBrace(), commandEnd(), MathEditor(), serialize(), splitBare(), splitBy(), splitMath(), MathEditor

### Community 71 - "StudentExampleTable.jsx"
Cohesion: 0.19
Nodes (13): ag-grid-community, ag-grid-react, react-paginate, GridExample(), Pagination(), SearchInput(), SelectBox(), ActivityTable() (+5 more)

### Community 73 - "FreeLessons.jsx"
Cohesion: 0.29
Nodes (9): formatDateTime(), formatPhone(), FreeLessons(), LeadRow(), pad(), STATUS_KEYS, STATUS_STYLE, TEXTS (+1 more)

### Community 74 - "react-icons"
Cohesion: 0.13
Nodes (12): react-dom, react-icons, buttons, CalculatorModal(), MultiplicationMathModal(), numbers, generateAllQuestions(), MultiplicationQuizModal() (+4 more)

### Community 75 - "LigaDashboard.jsx"
Cohesion: 0.19
Nodes (18): LigaSeasonEmpty(), EMPTY_TEST, LigaDashboard(), Overview(), SOURCE_LABELS, TABS, TESTS_HERO, HeadCell() (+10 more)

### Community 76 - "key-metric/index.js"
Cohesion: 0.24
Nodes (8): Banner(), FEATURES, formatCount(), highlightBrand(), KeyMetric(), splitParagraphs(), TEXTS, AboutUs()

### Community 77 - "ratings/index.js"
Cohesion: 0.24
Nodes (7): AVATAR_COLORS, COUNTS, getAvatarColor(), getInitial(), InitialAvatar(), PODIUM_STYLES, StudentTopLeaderboard()

### Community 78 - "powerful-dozens/index.js"
Cohesion: 0.67
Nodes (3): AppStoreButtons(), FEATURES, PowerfulDozens()

### Community 79 - "useImageAccentColor.js"
Cohesion: 0.53
Nodes (5): colorCache, extractAccentColor(), hslToHex(), rgbToHsl(), useImageAccentColor()

### Community 80 - "MyChildren.jsx"
Cohesion: 0.28
Nodes (10): RemoveChildModal(), GRADE_TONES, gradeTone(), isActive(), MyChildren(), RowMenu(), splitDateTime(), subjectStyle() (+2 more)

### Community 81 - "SubscriptionPromoModal.jsx"
Cohesion: 0.08
Nodes (27): @mui/icons-material, AVATAR_COLORS, DetailItem(), ParentChildrenCard(), CouponSection(), ModalHeader(), NASIYA_TERMS, NasiyaInstallmentOption() (+19 more)

### Community 82 - "eslint.config.mjs"
Cohesion: 0.25
Nodes (4): compat, __dirname, eslintConfig, __filename

### Community 83 - "wrapAnswer.js"
Cohesion: 0.40
Nodes (10): addWrapper(), isSimpleNumber(), isWrapped(), needsWrapper(), normalizeAnswerForBackend(), normalizeLatex(), normalizeMultiplicationForBackend(), stripDelimiters() (+2 more)

### Community 85 - "app.js"
Cohesion: 0.24
Nodes (11): APP_STORE_URL, GOOGLE_PLAY_URL, SMART_APP_DOWNLOAD_PATH, AppleIcon(), FEATURES, Flag(), HeroImage(), IqMathAppPage() (+3 more)

### Community 86 - "ckeditor.js"
Cohesion: 0.25
Nodes (7): DEFAULT_CKEDITOR_CONFIG, DEFAULT_REMOVE_PLUGINS, DEFAULT_TOOLBAR, EDITOR_DIMENSIONS, FULL_CKEDITOR_CONFIG, IMAGE_UPLOAD_CONFIG, MINIMAL_CKEDITOR_CONFIG

### Community 87 - "RobotWalker.jsx"
Cohesion: 0.47
Nodes (4): three, random(), RobotWalker(), stripRootMotion()

### Community 89 - "uzbekistan-map/index.jsx"
Cohesion: 0.33
Nodes (7): normalize(), regionNameById, stripSuffix(), UzbekistanMap(), regionsUz, UZBEKISTAN_MAP_VIEWBOX, uzbekistanMapPaths

### Community 92 - "history/index.js"
Cohesion: 0.36
Nodes (7): CoverImage(), MyPurchasedBooks(), STATUS_CONFIG, StatusBadge(), toAbs(), MyBooksPage(), LibraryPage()

### Community 93 - "[id]/index.jsx"
Cohesion: 0.43
Nodes (4): EyeIcon(), ChildNotFoundState(), Index(), StatBadge()

### Community 94 - "dummy-data/index.js"
Cohesion: 0.29
Nodes (5): fractionsData, groupsPupil, howItWorks, questions, topics

### Community 95 - "library/[id]/index.js"
Cohesion: 0.36
Nodes (6): Statistics(), BookDetail(), InfoRow(), SkeletonDetail(), toAbs(), Index()

### Community 97 - "CouponUsersList.jsx"
Cohesion: 0.48
Nodes (3): CouponUsersList(), EmptyUserState(), CouponsUsers()

### Community 100 - "ProductsExchange.jsx"
Cohesion: 0.48
Nodes (3): EmptyState(), LoadingState(), ProductsExchange()

### Community 101 - "api/index.js"
Cohesion: 0.09
Nodes (22): axios, react-hot-toast, @tanstack/react-query, NEWS, newsApi, NewsPage(), newsApi, NewsSlider() (+14 more)

### Community 102 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, eslint, postcss, tailwindcss, @types/react

### Community 103 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 104 - "TrialSettings.jsx"
Cohesion: 0.38
Nodes (5): PRESETS, QUERY_KEY, TEXTS, TrialSettings(), Index()

### Community 105 - "CoinsTab.jsx"
Cohesion: 0.60
Nodes (4): CoinsIcon(), CoinConvert(), CoinsTab(), Index()

### Community 106 - "MultiplicationModal.jsx"
Cohesion: 0.60
Nodes (3): MultiplicationModal(), numbers, NavbarMultiplication()

### Community 107 - "ParentQr"
Cohesion: 0.50
Nodes (4): Corner(), FeatureCard(), ParentQr(), Index()

### Community 109 - "StudentExampleDetailLayout.jsx"
Cohesion: 0.14
Nodes (11): better-react-mathjax, cleanLatex(), cleanText(), parseHtml(), StudentExampleAnswerPanel(), StudentExampleDetailLayout(), parseHtml(), StudentExampleQuestionList() (+3 more)

### Community 111 - "Editing this README"
Cohesion: 0.10
Nodes (20): Add your files, Authors and acknowledgment, Badges, Collaborate with your team, Contributing, Description, Editing this README, Getting started (+12 more)

### Community 113 - "TeacherGroupDetail.jsx"
Cohesion: 0.06
Nodes (51): lucide-react, Leadership(), TEXTS, leadershipApi, LeadershipSlider(), mathJaxConfig, PROFESSIONS, ActionTile() (+43 more)

### Community 124 - "SubjectOld.jsx"
Cohesion: 0.07
Nodes (39): @ckeditor/ckeditor5-react, @dnd-kit/core, html-react-parser, react-player, Button(), CloseIcon(), EditIcon(), QuestionCountIcon() (+31 more)

### Community 129 - "test-calc/index.js"
Cohesion: 0.15
Nodes (10): brainly-style-guide, availableMathSymbols, Symbols(), MathKeyboard(), texSymbols, availableMathSymbols, MathSymbols(), symbolsList (+2 more)

### Community 165 - "header/index.jsx"
Cohesion: 0.24
Nodes (9): Header(), navLinks, InstagramIcon(), PhoneIcon(), TelegramIcon(), YoutubeIcon(), ADDRESS_MAP_URL, SOCIAL_LINKS (+1 more)

### Community 170 - "DiagnosticSubjects.jsx"
Cohesion: 0.12
Nodes (29): CardDiagnostic(), scoreColor(), CardLockedSubject(), CardSubject(), DEFAULT_THEME, ModalConfidentiality(), SectionHeader(), StatsCarousel() (+21 more)

### Community 175 - "student/subjects/[id]/index.js"
Cohesion: 0.12
Nodes (20): BaseBreadcrumbs(), ChartIcon(), ClockIcon(), formatDuration(), ListIcon(), ReactPlayer, StatTile(), TopicDetail() (+12 more)

## Knowledge Gaps
- **33 isolated node(s):** `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image`, `@ckeditor/ckeditor5-source-editing`, `@ckeditor/ckeditor5-special-characters` (+28 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1014 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **54 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `LayoutAdmin`, `LigaDashboard.jsx`, `QuestionForm.jsx`, `useGetQuery`, `SubjectQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `react-i18next`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `liga/utils.js`, `Auth.js`, `@heroui/react`, `_app.js`, `@tabler/icons`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `footer/index.js`, `store/index.js`, `GameRenderer.js`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `exceptional-feature/index.js`, `[student_id].js`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `menuConfig.js`, `student/chat/index.js`, `ParentConnect.jsx`, `ContentLoader`, `next`, `LigaTestDetail.jsx`, `MessageBubble.jsx`, `StudentProfile.jsx`, `store/index.js`, `@dnd-kit/sortable`, `HpHeader.js`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `form/index.js`, `SwitchToChildButton.jsx`, `MathEditor.jsx`, `StudentExampleTable.jsx`, `PaymentMethods.js`, `FreeLessons.jsx`, `react-icons`, `LigaDashboard.jsx`, `key-metric/index.js`, `ratings/index.js`, `useImageAccentColor.js`, `MyChildren.jsx`, `SubscriptionPromoModal.jsx`, `app.js`, `RobotWalker.jsx`, `react-circular-progressbar`, `uzbekistan-map/index.jsx`, `[id]/index.jsx`, `dummy-data/index.js`, `library/[id]/index.js`, `CouponUsersList.jsx`, `ProductsExchange.jsx`, `api/index.js`, `TrialSettings.jsx`, `MultiplicationModal.jsx`, `ImpersonationBar.jsx`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`, `test-calc/index.js`, `header/index.jsx`, `DiagnosticSubjects.jsx`, `student/subjects/[id]/index.js`?**
  _High betweenness centrality (0.213) - this node is a cross-community bridge._
- **What connects `@ag-grid-community/client-side-row-model`, `@ckeditor/ckeditor5-build-classic`, `@ckeditor/ckeditor5-image` to the rest of the system?**
  _33 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LayoutAdmin` be split into smaller, more focused modules?**
  _Cohesion score 0.08619777895293496 - nodes in this community are weakly interconnected._
- **Why does `react-i18next` connect `react-i18next` to `LayoutAdmin`, `QuestionForm.jsx`, `react`, `useGetQuery`, `SubjectQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `package.json`, `usePostQuery`, `ProductCard.jsx`, `Auth.js`, `@heroui/react`, `_app.js`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `student/my-study/index.js`, `store/index.js`, `header/index.jsx`, `GameRenderer.js`, `ChildOverview.jsx`, `DiagnosticMistakes.jsx`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `framer-motion`, `DiagnosticSubjects.jsx`, `[student_id].js`, `student/subjects/[id]/index.js`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `BattleSetupForm.jsx`, `student/chat/index.js`, `ParentConnect.jsx`, `ContentLoader`, `next`, `MessageBubble.jsx`, `StudentProfile.jsx`, `store/index.js`, `HpHeader.js`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `SwitchToChildButton.jsx`, `StudentExampleTable.jsx`, `FreeLessons.jsx`, `react-icons`, `key-metric/index.js`, `ratings/index.js`, `powerful-dozens/index.js`, `MyChildren.jsx`, `SubscriptionPromoModal.jsx`, `i18n/index.js`, `react-circular-progressbar`, `history/index.js`, `[id]/index.jsx`, `library/[id]/index.js`, `CouponUsersList.jsx`, `ProductsExchange.jsx`, `api/index.js`, `TrialSettings.jsx`, `CoinsTab.jsx`, `MultiplicationModal.jsx`, `ImpersonationBar.jsx`, `StudentExampleDetailLayout.jsx`, `TeacherGroupDetail.jsx`, `SubjectOld.jsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `h` be split into smaller, more focused modules?**
  _Cohesion score 0.06533646322378717 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `TeacherGroupDetail.jsx` to `LigaDashboard.jsx`, `QuestionForm.jsx`, `useGetQuery`, `SubjectQuestions.jsx`, `Theme.js`, `ChatBoxModule.js`, `QuestionWorkspace.jsx`, `@mui/material`, `react-i18next`, `SiteStatistics.jsx`, `package.json`, `usePostQuery`, `liga/utils.js`, `Auth.js`, `@heroui/react`, `PricingContent.jsx`, `BattleArena.jsx`, `role-landing/shared.jsx`, `StudentTable.jsx`, `store/index.js`, `header/index.jsx`, `DiagnosticMistakes.jsx`, `ChildOverview.jsx`, `GameRenderer.js`, `ReviewCarousel.js`, `LigaTestRun.jsx`, `DiagnosticSubjects.jsx`, `BattleSetupForm.jsx`, `BottomSections.jsx`, `LanguageDropdown`, `lucide-react`, `NewsSingle.jsx`, `ParentConnect.jsx`, `ContentLoader`, `LigaTestDetail.jsx`, `MessageBubble.jsx`, `HpHeader.js`, `TutorProfile.jsx`, `menulist.js`, `AuthMascot.jsx`, `SwitchToChildButton.jsx`, `FreeLessons.jsx`, `LigaDashboard.jsx`, `key-metric/index.js`, `ratings/index.js`, `powerful-dozens/index.js`, `MyChildren.jsx`, `SubscriptionPromoModal.jsx`, `app.js`, `history/index.js`, `[id]/index.jsx`, `CouponUsersList.jsx`, `api/index.js`, `TrialSettings.jsx`, `ImpersonationBar.jsx`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02631578947368421 - nodes in this community are weakly interconnected._