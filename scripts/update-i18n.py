#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Updates i18n-data.js with new keys for all 6 languages."""
import re

ROOT = "/Users/master117/Desktop/Kazehana-Static-Website"
FILE = f"{ROOT}/js/i18n-data.js"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Parse the JS object structure - find each language section
# The structure is: KZT.translations = { LANG: { ... }, LANG: { ... } };

# New keys with translations for each language
new_keys = {
    # Page titles
    "titleIndex": {"en": "Kazehana Cloud PMS | Hospitality Operations, Simplified", "es": "Kazehana Cloud PMS | Operaciones Hoteleras Simplificadas", "fr": "Kazehana Cloud PMS | Opérations Hôtelières Simplifiées", "pt": "Kazehana Cloud PMS | Operações Hoteleiras Simplificadas", "it": "Kazehana Cloud PMS | Operazioni Alberghiere Semplificate", "ja": "Kazehana Cloud PMS | ホスピタリティ業務をシンプルに"},
    "titleModules": {"en": "Modules | Kazehana Cloud PMS", "es": "Módulos | Kazehana Cloud PMS", "fr": "Modules | Kazehana Cloud PMS", "pt": "Módulos | Kazehana Cloud PMS", "it": "Moduli | Kazehana Cloud PMS", "ja": "モジュール | Kazehana Cloud PMS"},
    "titleWorkflow": {"en": "Workflow | Kazehana Cloud PMS", "es": "Flujo de trabajo | Kazehana Cloud PMS", "fr": "Workflow | Kazehana Cloud PMS", "pt": "Fluxo de trabalho | Kazehana Cloud PMS", "it": "Workflow | Kazehana Cloud PMS", "ja": "ワークフロー | Kazehana Cloud PMS"},
    "titleFaq": {"en": "FAQ | Kazehana Cloud PMS", "es": "Preguntas frecuentes | Kazehana Cloud PMS", "fr": "FAQ | Kazehana Cloud PMS", "pt": "FAQ | Kazehana Cloud PMS", "it": "FAQ | Kazehana Cloud PMS", "ja": "よくある質問 | Kazehana Cloud PMS"},
    "titleContact": {"en": "Contact | Kazehana Cloud PMS", "es": "Contacto | Kazehana Cloud PMS", "fr": "Contact | Kazehana Cloud PMS", "pt": "Contato | Kazehana Cloud PMS", "it": "Contatto | Kazehana Cloud PMS", "ja": "お問い合わせ | Kazehana Cloud PMS"},
    "titleAbout": {"en": "About | Kazehana Cloud PMS", "es": "Nosotros | Kazehana Cloud PMS", "fr": "À propos | Kazehana Cloud PMS", "pt": "Sobre | Kazehana Cloud PMS", "it": "Chi siamo | Kazehana Cloud PMS", "ja": "会社概要 | Kazehana Cloud PMS"},
    "titlePricing": {"en": "Pricing | Kazehana Cloud PMS", "es": "Precios | Kazehana Cloud PMS", "fr": "Tarifs | Kazehana Cloud PMS", "pt": "Preços | Kazehana Cloud PMS", "it": "Prezzi | Kazehana Cloud PMS", "ja": "料金 | Kazehana Cloud PMS"},

    # Meta descriptions
    "metaDescIndex": {"en": "Kazehana Cloud PMS is a modern property management system for hotels and restaurants.", "es": "Kazehana Cloud PMS es un sistema moderno de gestión hotelera para hoteles y restaurantes.", "fr": "Kazehana Cloud PMS est un système moderne de gestion hôtelière.", "pt": "Kazehana Cloud PMS é um sistema moderno de gestão hoteleira.", "it": "Kazehana Cloud PMS è un moderno sistema di gestione alberghiera.", "ja": "Kazehana Cloud PMSはホテルとレストランのための最新PMSです。"},
    "metaDescModules": {"en": "Explore Kazehana Cloud PMS core modules.", "es": "Explore los módulos principales de Kazehana Cloud PMS.", "fr": "Explorez les modules principaux de Kazehana Cloud PMS.", "pt": "Explore os módulos principais do Kazehana Cloud PMS.", "it": "Esplora i moduli principali di Kazehana Cloud PMS.", "ja": "Kazehana Cloud PMSのコアモジュールをご覧ください。"},
    "metaDescWorkflow": {"en": "See how Kazehana onboards your property in weeks.", "es": "Vea cómo Kazehana implementa su propiedad en semanas.", "fr": "Découvrez comment Kazehana déploie votre propriété en semaines.", "pt": "Veja como a Kazehana implementa sua propriedade em semanas.", "it": "Scopri come Kazehana implementa la tua struttura in settimane.", "ja": "Kazehanaが数週間で貴施設をオンボーディングする方法をご覧ください。"},
    "metaDescFaq": {"en": "Frequently asked questions about Kazehana Cloud PMS.", "es": "Preguntas frecuentes sobre Kazehana Cloud PMS.", "fr": "Questions fréquentes sur Kazehana Cloud PMS.", "pt": "Perguntas frequentes sobre o Kazehana Cloud PMS.", "it": "Domande frequenti su Kazehana Cloud PMS.", "ja": "Kazehana Cloud PMSに関するよくある質問。"},
    "metaDescContact": {"en": "Get in touch with Kazehana Cloud PMS.", "es": "Contacte con Kazehana Cloud PMS.", "fr": "Contactez Kazehana Cloud PMS.", "pt": "Entre em contato com o Kazehana Cloud PMS.", "it": "Contatta Kazehana Cloud PMS.", "ja": "Kazehana Cloud PMSにお問い合わせください。"},
    "metaDescAbout": {"en": "Learn about Kazehana Cloud PMS — our mission and values.", "es": "Conozca Kazehana Cloud PMS — nuestra misión y valores.", "fr": "Découvrez Kazehana Cloud PMS — notre mission et nos valeurs.", "pt": "Conheça o Kazehana Cloud PMS — nossa missão e valores.", "it": "Scopri Kazehana Cloud PMS — la nostra missione e i nostri valori.", "ja": "Kazehana Cloud PMSのミッションと価値観をご覧ください。"},
    "metaDescPricing": {"en": "Explore Kazehana Cloud PMS pricing tiers.", "es": "Explore los planes de precios de Kazehana Cloud PMS.", "fr": "Explorez les niveaux de tarification de Kazehana Cloud PMS.", "pt": "Explore os planos de preços do Kazehana Cloud PMS.", "it": "Esplora i livelli di prezzo di Kazehana Cloud PMS.", "ja": "Kazehana Cloud PMSの料金プランをご覧ください。"},

    # Missing nav/footer keys
    "navModules": {"en": "Modules", "es": "Módulos", "fr": "Modules", "pt": "Módulos", "it": "Moduli", "ja": "モジュール"},
    "navPricing": {"en": "Pricing", "es": "Precios", "fr": "Tarifs", "pt": "Preços", "it": "Prezzi", "ja": "料金"},
    "navAbout": {"en": "About Us", "es": "Nosotros", "fr": "À propos", "pt": "Sobre", "it": "Chi siamo", "ja": "会社概要"},
    "navSecurity": {"en": "Security", "es": "Seguridad", "fr": "Sécurité", "pt": "Segurança", "it": "Sicurezza", "ja": "セキュリティ"},
    "navDocs": {"en": "Documentation", "es": "Documentación", "fr": "Documentation", "pt": "Documentação", "it": "Documentazione", "ja": "ドキュメント"},
    "navBlog": {"en": "Blog", "es": "Blog", "fr": "Blog", "pt": "Blog", "it": "Blog", "ja": "ブログ"},
    "navPrivacy": {"en": "Privacy Policy", "es": "Política de privacidad", "fr": "Politique de confidentialité", "pt": "Política de privacidade", "it": "Informativa sulla privacy", "ja": "プライバシーポリシー"},
    "navTerms": {"en": "Terms of Service", "es": "Términos de servicio", "fr": "Conditions d'utilisation", "pt": "Termos de serviço", "it": "Termini di servizio", "ja": "利用規約"},
    "navSupport": {"en": "Support", "es": "Soporte", "fr": "Support", "pt": "Suporte", "it": "Supporto", "ja": "サポート"},

    # Footer columns
    "footerColPlatform": {"en": "Platform", "es": "Plataforma", "fr": "Plateforme", "pt": "Plataforma", "it": "Piattaforma", "ja": "プラットフォーム"},
    "footerColSolutions": {"en": "Solutions", "es": "Soluciones", "fr": "Solutions", "pt": "Soluções", "it": "Soluzioni", "ja": "ソリューション"},
    "footerColResources": {"en": "Resources", "es": "Recursos", "fr": "Ressources", "pt": "Recursos", "it": "Risorse", "ja": "リソース"},
    "footerColCompany": {"en": "Company", "es": "Empresa", "fr": "Entreprise", "pt": "Empresa", "it": "Azienda", "ja": "会社"},
    "footerTagline": {"en": "Crafted for hotel operations teams.", "es": "Diseñado para equipos de operaciones hoteleras.", "fr": "Conçu pour les équipes d'exploitation hôtelière.", "pt": "Projetado para equipes de operações hoteleiras.", "it": "Progettato per i team operativi alberghieri.", "ja": "ホテル運営チームのために作られました。"},
    "newsletterLabel": {"en": "Stay updated", "es": "Mantente informado", "fr": "Restez informé", "pt": "Mantenha-se atualizado", "it": "Rimani aggiornato", "ja": "最新情報を受け取る"},
    "newsletterButton": {"en": "Subscribe", "es": "Suscribirse", "fr": "S'abonner", "pt": "Inscrever-se", "it": "Iscriviti", "ja": "購読"},

    # Solution links
    "solutionBoutique": {"en": "Boutique Hotels", "es": "Hoteles boutique", "fr": "Hôtels boutique", "pt": "Hotéis boutique", "it": "Hotel boutique", "ja": "ブティックホテル"},
    "solutionResort": {"en": "Resorts", "es": "Resorts", "fr": "Resorts", "pt": "Resorts", "it": "Resort", "ja": "リゾート"},
    "solutionBusiness": {"en": "Business Hotels", "es": "Hoteles de negocios", "fr": "Hôtels d'affaires", "pt": "Hotéis de negócios", "it": "Hotel business", "ja": "ビジネスホテル"},
    "solutionHostel": {"en": "Hostels", "es": "Hostales", "fr": "Auberges", "pt": "Hostels", "it": "Ostelli", "ja": "ホステル"},

    # Missing section tags
    "heroBadge": {"en": "Next-gen PMS", "es": "PMS de nueva generación", "fr": "PMS nouvelle génération", "pt": "PMS de nova geração", "it": "PMS di nuova generazione", "ja": "次世代PMS"},
    "statUptime": {"en": "Uptime SLA", "es": "SLA de disponibilidad", "fr": "SLA de disponibilité", "pt": "SLA de uptime", "it": "SLA di uptime", "ja": "稼働率SLA"},
    "statProperties": {"en": "Properties", "es": "Propiedades", "fr": "Établissements", "pt": "Propriedades", "it": "Strutture", "ja": "施設数"},
    "statGoLive": {"en": "Avg. go-live", "es": "Lanzamiento promedio", "fr": "Délai moyen de mise en service", "pt": "Tempo médio de ativação", "it": "Tempo medio di attivazione", "ja": "平均稼働開始"},
    "statSupport": {"en": "Concierge support", "es": "Soporte personalizado", "fr": "Support conciergerie", "pt": "Suporte concierge", "it": "Supporto concierge", "ja": "コンシェルジュサポート"},
    "modulesTag": {"en": "Core platform", "es": "Plataforma central", "fr": "Plateforme principale", "pt": "Plataforma central", "it": "Piattaforma core", "ja": "コアプラットフォーム"},
    "featuresTag": {"en": "Why Kazehana", "es": "Por qué Kazehana", "fr": "Pourquoi Kazehana", "pt": "Por que Kazehana", "it": "Perché Kazehana", "ja": "Kazehanaの強み"},
    "featuresTitle": {"en": "Built for teams that move fast.", "es": "Diseñado para equipos que se mueven rápido.", "fr": "Conçu pour les équipes qui avancent vite.", "pt": "Feito para equipes que se movem rápido.", "it": "Progettato per team che si muovono velocemente.", "ja": "素早く動くチームのために。"},
    "featuresLead": {"en": "Every department gets a dashboard that surfaces exactly what matters.", "es": "Cada departamento tiene un panel que muestra exactamente lo que importa.", "fr": "Chaque service dispose d'un tableau de bord qui montre ce qui compte.", "pt": "Cada departamento recebe um painel que mostra exatamente o que importa.", "it": "Ogni reparto ha una dashboard che mostra esattamente ciò che conta.", "ja": "すべての部門に重要な情報だけを表示するダッシュボードを。"},
    "workflowTag": {"en": "Onboarding", "es": "Implementación", "fr": "Intégration", "pt": "Onboarding", "it": "Onboarding", "ja": "導入プロセス"},
    "visionTag": {"en": "Architecture", "es": "Arquitectura", "fr": "Architecture", "pt": "Arquitetura", "it": "Architettura", "ja": "アーキテクチャ"},
    "screenshotsTag": {"en": "Product", "es": "Producto", "fr": "Produit", "pt": "Produto", "it": "Prodotto", "ja": "製品"},
    "hotelsTag": {"en": "Portfolio", "es": "Portafolio", "fr": "Portefeuille", "pt": "Portfólio", "it": "Portafoglio", "ja": "導入実績"},
    "trustTag": {"en": "Testimonials", "es": "Testimonios", "fr": "Témoignages", "pt": "Depoimentos", "it": "Testimonianze", "ja": "お客様の声"},
    "faqTag": {"en": "Help", "es": "Ayuda", "fr": "Aide", "pt": "Ajuda", "it": "Aiuto", "ja": "ヘルプ"},
    "moduleChannelManager": {"en": "Channel Manager", "es": "Channel Manager", "fr": "Channel Manager", "pt": "Channel Manager", "it": "Channel Manager", "ja": "チャネルマネージャー"},
    "moduleFrontdeskDesc": {"en": "Reservations, check-in, housekeeping — orchestrated from one screen.", "es": "Reservas, check-in, limpieza — orquestado desde una sola pantalla.", "fr": "Réservations, check-in, entretien — orchestrés depuis un seul écran.", "pt": "Reservas, check-in, limpeza — orquestrado de uma única tela.", "it": "Prenotazioni, check-in, pulizie — orchestrati da un'unica schermata.", "ja": "予約、チェックイン、ハウスキーピングを1画面で管理。"},

    # Homepage trust bar + summary
    "trustBarLabel": {"en": "Trusted by properties connected to", "es": "Confiado por propiedades conectadas a", "fr": "Approuvé par des établissements connectés à", "pt": "Confiável por propriedades conectadas a", "it": "Utilizzato da strutture connesse a", "ja": "接続先として信頼されています"},
    "homeSummaryTag": {"en": "Platform", "es": "Plataforma", "fr": "Plateforme", "pt": "Plataforma", "it": "Piattaforma", "ja": "プラットフォーム"},
    "homeSummaryTitle": {"en": "One system, every department.", "es": "Un sistema, todos los departamentos.", "fr": "Un seul système, tous les services.", "pt": "Um sistema, todos os departamentos.", "it": "Un sistema, tutti i reparti.", "ja": "すべての部門を1つのシステムで。"},
    "homeSummaryLead": {"en": "Explore how Kazehana brings your operations together.", "es": "Descubra cómo Kazehana unifica sus operaciones.", "fr": "Découvrez comment Kazehana unifie vos opérations.", "pt": "Explore como a Kazehana unifica suas operações.", "it": "Scopri come Kazehana unifica le tue operazioni.", "ja": "Kazehanaが業務を統合する方法をご覧ください。"},
    "homeSummary1Title": {"en": "Powerful modules", "es": "Módulos potentes", "fr": "Modules puissants", "pt": "Módulos poderosos", "it": "Moduli potenti", "ja": "パワフルなモジュール"},
    "homeSummary1Desc": {"en": "Front desk, restaurant, management, accounting, e-invoicing, and channel manager in one login.", "es": "Front desk, restaurante, gestión, contabilidad, facturación electrónica y channel manager en un solo inicio de sesión.", "fr": "Réception, restaurant, gestion, comptabilité, facturation électronique et channel manager avec une seule connexion.", "pt": "Front desk, restaurante, gestão, contabilidade, faturamento eletrônico e channel manager em um único login.", "it": "Reception, ristorante, gestione, contabilità, fatturazione elettronica e channel manager in un unico accesso.", "ja": "フロントデスク、レストラン、管理、会計、電子請求、チャネルマネージャーを1つのログインで。"},
    "homeSummary1Link": {"en": "Explore modules →", "es": "Explorar módulos →", "fr": "Explorer les modules →", "pt": "Explorar módulos →", "it": "Esplora moduli →", "ja": "モジュールを見る →"},
    "homeSummary2Title": {"en": "Proven onboarding", "es": "Implementación probada", "fr": "Intégration éprouvée", "pt": "Onboarding comprovado", "it": "Onboarding collaudato", "ja": "実績のある導入プロセス"},
    "homeSummary2Desc": {"en": "Launch in weeks, not months. We map, configure, and train your team with concierge support.", "es": "Lance en semanas, no meses. Mapeamos, configuramos y capacitamos a su equipo con soporte personalizado.", "fr": "Lancement en semaines, pas en mois. Nous cartographions, configurons et formons votre équipe.", "pt": "Lance em semanas, não meses. Mapeamos, configuramos e treinamos sua equipe com suporte concierge.", "it": "Lancio in settimane, non mesi. Mappiamo, configuriamo e formiamo il tuo team con supporto concierge.", "ja": "数週間で稼働。貴施設のマッピング、設定、チームトレーニングをコンシェルジュがサポート。"},
    "homeSummary2Link": {"en": "See workflow →", "es": "Ver flujo de trabajo →", "fr": "Voir le workflow →", "pt": "Ver fluxo de trabalho →", "it": "Vedi workflow →", "ja": "ワークフローを見る →"},
    "homeSummary3Title": {"en": "Transparent pricing", "es": "Precios transparentes", "fr": "Tarifs transparents", "pt": "Preços transparentes", "it": "Prezzi trasparenti", "ja": "透明な料金体系"},
    "homeSummary3Desc": {"en": "Plans tailored to your property size. No hidden fees, no surprises.", "es": "Planes adaptados al tamaño de su propiedad. Sin costos ocultos.", "fr": "Plans adaptés à la taille de votre établissement. Sans frais cachés.", "pt": "Planos adaptados ao tamanho da sua propriedade. Sem custos ocultos.", "it": "Piani su misura per la tua struttura. Nessun costo nascosto.", "ja": "施設規模に合わせたプラン。隠れた料金なし。"},
    "homeSummary3Link": {"en": "View pricing →", "es": "Ver precios →", "fr": "Voir les tarifs →", "pt": "Ver preços →", "it": "Vedi prezzi →", "ja": "料金を見る →"},

    # Timeline
    "timelineTag": {"en": "Timeline", "es": "Cronograma", "fr": "Calendrier", "pt": "Cronograma", "it": "Cronologia", "ja": "スケジュール"},
    "timelineTitle": {"en": "What to expect, week by week.", "es": "Qué esperar, semana a semana.", "fr": "À quoi s'attendre, semaine par semaine.", "pt": "O que esperar, semana a semana.", "it": "Cosa aspettarsi, settimana per settimana.", "ja": "週ごとの流れ。"},
    "timelineLead": {"en": "A typical onboarding follows this cadence — we adapt to your pace.", "es": "Una implementación típica sigue este ritmo — nos adaptamos al suyo.", "fr": "Une intégration type suit ce rythme — nous nous adaptons au vôtre.", "pt": "Uma implementação típica segue este ritmo — nos adaptamos ao seu.", "it": "Un onboarding tipico segue questo ritmo — ci adattiamo al tuo.", "ja": "標準的な導入はこのペースで進みます — お客様のペースに合わせます。"},
    "tlWeek1Title": {"en": "Discovery & audit", "es": "Descubrimiento y auditoría", "fr": "Découverte et audit", "pt": "Descoberta e auditoria", "it": "Scoperta e audit", "ja": "現状把握と分析"},
    "tlWeek1Body": {"en": "We walk your property, map current workflows, and identify quick wins.", "es": "Recorremos su propiedad, mapeamos flujos actuales e identificamos mejoras rápidas.", "fr": "Nous visitons votre établissement, cartographions les flux et identifions les gains rapides.", "pt": "Visitamos sua propriedade, mapeamos fluxos atuais e identificamos ganhos rápidos.", "it": "Visitiamo la tua struttura, mappiamo i flussi e identifichiamo i quick win.", "ja": "施設を見学し、現在のワークフローをマッピング、改善点を特定します。"},
    "tlWeek2Title": {"en": "Configuration sprint", "es": "Sprint de configuración", "fr": "Sprint de configuration", "pt": "Sprint de configuração", "it": "Sprint di configurazione", "ja": "設定スプリント"},
    "tlWeek2Body": {"en": "Room types, rate plans, restaurant layouts, and channel connections go live in staging.", "es": "Tipos de habitación, tarifas, diseños de restaurante y conexiones de canales se activan en staging.", "fr": "Types de chambres, plans tarifaires, plans de restaurant et connexions de canaux sont activés en staging.", "pt": "Tipos de quarto, tarifas, layouts de restaurante e conexões de canais vão ao ar em staging.", "it": "Tipi di camere, piani tariffari, layout del ristorante e connessioni ai canali vanno live in staging.", "ja": "部屋タイプ、料金プラン、レストランレイアウト、チャネル接続をステージング環境で設定。"},
    "tlWeek3Title": {"en": "Team training", "es": "Capacitación del equipo", "fr": "Formation de l'équipe", "pt": "Treinamento da equipe", "it": "Formazione del team", "ja": "チームトレーニング"},
    "tlWeek3Body": {"en": "Role-based sessions for front desk, housekeeping, F&B, and management.", "es": "Sesiones por rol para recepción, limpieza, alimentos y bebidas, y gerencia.", "fr": "Sessions par rôle pour la réception, l'entretien, la restauration et la direction.", "pt": "Sessões por função para recepção, limpeza, A&B e gerência.", "it": "Sessioni per ruolo per reception, pulizie, F&B e direzione.", "ja": "フロントデスク、ハウスキーピング、飲食、管理部門向けのロール別セッション。"},
    "tlWeek4Title": {"en": "Go-live & hypercare", "es": "Lanzamiento y soporte intensivo", "fr": "Mise en service et hypercare", "pt": "Go-live e suporte intensivo", "it": "Go-live e hypercare", "ja": "本番稼働と集中サポート"},
    "tlWeek4Body": {"en": "Production launch with dedicated support. Daily check-ins for the first 14 days.", "es": "Lanzamiento en producción con soporte dedicado. Revisiones diarias durante los primeros 14 días.", "fr": "Lancement en production avec support dédié. Points quotidiens pendant les 14 premiers jours.", "pt": "Lançamento em produção com suporte dedicado. Check-ins diários nos primeiros 14 dias.", "it": "Lancio in produzione con supporto dedicato. Check-in giornalieri per i primi 14 giorni.", "ja": "専任サポート付きで本番稼働。最初の14日間は毎日チェックイン。"},

    # Integrations
    "integrationsTag": {"en": "Ecosystem", "es": "Ecosistema", "fr": "Écosystème", "pt": "Ecossistema", "it": "Ecosistema", "ja": "エコシステム"},
    "integrationsTitle": {"en": "Plugs into your stack.", "es": "Se integra con tus herramientas.", "fr": "S'intègre à votre stack.", "pt": "Integra-se ao seu stack.", "it": "Si integra con i tuoi strumenti.", "ja": "既存ツールと連携。"},
    "integrationsLead": {"en": "Pre-built connectors for the tools your property already uses.", "es": "Conectores preconstruidos para las herramientas que ya usa su propiedad.", "fr": "Connecteurs prêts à l'emploi pour les outils que votre établissement utilise déjà.", "pt": "Conectores prontos para as ferramentas que sua propriedade já usa.", "it": "Connettori pronti per gli strumenti che la tua struttura già utilizza.", "ja": "お客様の施設がすでに使用しているツールとのコネクターを標準装備。"},

    # Support channels
    "supportTag": {"en": "Support", "es": "Soporte", "fr": "Support", "pt": "Suporte", "it": "Supporto", "ja": "サポート"},
    "supportTitle": {"en": "We're here to help.", "es": "Estamos aquí para ayudar.", "fr": "Nous sommes là pour vous aider.", "pt": "Estamos aqui para ajudar.", "it": "Siamo qui per aiutarti.", "ja": "いつでもお手伝いします。"},
    "supportEmailTitle": {"en": "Email", "es": "Correo electrónico", "fr": "Email", "pt": "E-mail", "it": "Email", "ja": "メール"},
    "supportEmailDesc": {"en": "support@kazehanacloud.com", "es": "support@kazehanacloud.com", "fr": "support@kazehanacloud.com", "pt": "support@kazehanacloud.com", "it": "support@kazehanacloud.com", "ja": "support@kazehanacloud.com"},
    "supportEmailTime": {"en": "Replies within 4 hours", "es": "Respondemos en 4 horas", "fr": "Réponse sous 4 heures", "pt": "Respostas em até 4 horas", "it": "Risposte entro 4 ore", "ja": "4時間以内に返信"},
    "supportPhoneTitle": {"en": "Phone", "es": "Teléfono", "fr": "Téléphone", "pt": "Telefone", "it": "Telefono", "ja": "電話"},
    "supportPhoneDesc": {"en": "+1 (555) 000-0000", "es": "+1 (555) 000-0000", "fr": "+1 (555) 000-0000", "pt": "+1 (555) 000-0000", "it": "+1 (555) 000-0000", "ja": "+1 (555) 000-0000"},
    "supportPhoneTime": {"en": "Mon–Fri, 8am–8pm EST", "es": "Lun–Vie, 8am–8pm EST", "fr": "Lun–Ven, 8h–20h EST", "pt": "Seg–Sex, 8h–20h EST", "it": "Lun–Ven, 8:00–20:00 EST", "ja": "月〜金 8:00〜20:00 EST"},
    "supportDocsTitle": {"en": "Knowledge base", "es": "Base de conocimiento", "fr": "Base de connaissances", "pt": "Base de conhecimento", "it": "Knowledge base", "ja": "ナレッジベース"},
    "supportDocsDesc": {"en": "Searchable guides and tutorials", "es": "Guías y tutoriales buscables", "fr": "Guides et tutoriels consultables", "pt": "Guias e tutoriais pesquisáveis", "it": "Guide e tutorial consultabili", "ja": "検索可能なガイドとチュートリアル"},
    "supportDocsTime": {"en": "Available 24/7", "es": "Disponible 24/7", "fr": "Disponible 24h/24, 7j/7", "pt": "Disponível 24/7", "it": "Disponibile 24/7", "ja": "24時間365日利用可能"},
    "supportChatTitle": {"en": "Live chat", "es": "Chat en vivo", "fr": "Chat en direct", "pt": "Chat ao vivo", "it": "Live chat", "ja": "ライブチャット"},
    "supportChatDesc": {"en": "In-app messaging", "es": "Mensajería en la app", "fr": "Messagerie intégrée", "pt": "Mensagens no app", "it": "Messaggistica in-app", "ja": "アプリ内メッセージ"},
    "supportChatTime": {"en": "For active subscribers", "es": "Para suscriptores activos", "fr": "Pour les abonnés actifs", "pt": "Para assinantes ativos", "it": "Per abbonati attivi", "ja": "アクティブな契約者向け"},

    # FAQ new
    "faq6Q": {"en": "Is my data secure?", "es": "¿Están seguros mis datos?", "fr": "Mes données sont-elles en sécurité ?", "pt": "Meus dados estão seguros?", "it": "I miei dati sono al sicuro?", "ja": "データは安全ですか？"},
    "faq6A": {"en": "Yes. We use encryption at rest and in transit, maintain PCI DSS compliance, and follow GDPR standards for data privacy.", "es": "Sí. Usamos encriptación en reposo y en tránsito, cumplimos con PCI DSS y seguimos los estándares GDPR de privacidad.", "fr": "Oui. Nous utilisons le chiffrement au repos et en transit, respectons la norme PCI DSS et suivons les standards GDPR.", "pt": "Sim. Usamos criptografia em repouso e em trânsito, mantemos conformidade PCI DSS e seguimos os padrões GDPR.", "it": "Sì. Utilizziamo crittografia a riposo e in transito, manteniamo la conformità PCI DSS e seguiamo gli standard GDPR.", "ja": "はい。保存データと通信データを暗号化し、PCI DSSに準拠し、GDPR基準に従っています。"},
    "faq7Q": {"en": "Which OTAs do you integrate with?", "es": "¿Con qué OTAs se integran?", "fr": "Avec quelles OTAs vous intégrez-vous ?", "pt": "Com quais OTAs vocês integram?", "it": "Con quali OTA vi integrate?", "ja": "どのOTAと連携できますか？"},
    "faq7A": {"en": "We connect with Booking.com, Expedia, Airbnb, Agoda, and major regional OTAs through our channel manager.", "es": "Nos conectamos con Booking.com, Expedia, Airbnb, Agoda y las principales OTAs regionales.", "fr": "Nous nous connectons avec Booking.com, Expedia, Airbnb, Agoda et les principales OTAs régionales.", "pt": "Conectamos com Booking.com, Expedia, Airbnb, Agoda e principais OTAs regionais.", "it": "Ci connettiamo con Booking.com, Expedia, Airbnb, Agoda e le principali OTA regionali.", "ja": "Booking.com、Expedia、Airbnb、Agodaおよび主要地域OTAとチャネルマネージャー経由で連携します。"},
    "faq8Q": {"en": "Do you support multiple properties and languages?", "es": "¿Soportan múltiples propiedades e idiomas?", "fr": "Prenez-vous en charge plusieurs établissements et langues ?", "pt": "Vocês suportam múltiplas propriedades e idiomas?", "it": "Supportate più strutture e lingue?", "ja": "複数施設と言語に対応していますか？"},
    "faq8A": {"en": "Yes. Manage multiple properties from one dashboard. The interface supports English, Spanish, French, Portuguese, Italian, and Japanese.", "es": "Sí. Gestione múltiples propiedades desde un panel. La interfaz soporta inglés, español, francés, portugués, italiano y japonés.", "fr": "Oui. Gérez plusieurs établissements depuis un seul tableau de bord. L'interface prend en charge 6 langues.", "pt": "Sim. Gerencie múltiplas propriedades de um painel. A interface suporta 6 idiomas.", "it": "Sì. Gestisci più strutture da un'unica dashboard. L'interfaccia supporta 6 lingue.", "ja": "はい。1つのダッシュボードで複数施設を管理。英語、スペイン語、フランス語、ポルトガル語、イタリア語、日本語に対応。"},
    "faq9Q": {"en": "What hardware do we need?", "es": "¿Qué hardware necesitamos?", "fr": "De quel matériel avons-nous besoin ?", "pt": "Que hardware precisamos?", "it": "Di che hardware abbiamo bisogno?", "ja": "どのようなハードウェアが必要ですか？"},
    "faq9A": {"en": "None beyond a modern web browser. Kazehana runs on any device — desktop, tablet, or mobile. No local servers to maintain.", "es": "Solo un navegador web moderno. Kazehana funciona en cualquier dispositivo — escritorio, tableta o móvil.", "fr": "Rien de plus qu'un navigateur web moderne. Kazehana fonctionne sur n'importe quel appareil.", "pt": "Apenas um navegador moderno. Kazehana funciona em qualquer dispositivo — desktop, tablet ou celular.", "it": "Solo un browser moderno. Kazehana funziona su qualsiasi dispositivo — desktop, tablet o mobile.", "ja": "最新のブラウザのみ。Kazehanaはデスクトップ、タブレット、モバイルのどのデバイスでも動作します。"},
    "faq10Q": {"en": "Can we cancel anytime?", "es": "¿Podemos cancelar en cualquier momento?", "fr": "Pouvons-nous annuler à tout moment ?", "pt": "Podemos cancelar a qualquer momento?", "it": "Possiamo disdire in qualsiasi momento?", "ja": "いつでも解約できますか？"},
    "faq10A": {"en": "We offer flexible terms. You can export your data at any time — no lock-in, no hidden fees.", "es": "Ofrecemos términos flexibles. Puede exportar sus datos en cualquier momento — sin bloqueo ni costos ocultos.", "fr": "Nous offrons des conditions flexibles. Vous pouvez exporter vos données à tout moment — sans engagement.", "pt": "Oferecemos termos flexíveis. Você pode exportar seus dados a qualquer momento — sem bloqueio.", "it": "Offriamo termini flessibili. Puoi esportare i tuoi dati in qualsiasi momento — nessun vincolo.", "ja": "柔軟な条件をご用意。いつでもデータをエクスポート可能 — ロックインなし、隠れた料金なし。"},
    "faqCtaTitle": {"en": "Still have questions?", "es": "¿Aún tienes preguntas?", "fr": "Encore des questions ?", "pt": "Ainda tem perguntas?", "it": "Hai ancora domande?", "ja": "まだ質問がありますか？"},
    "faqCtaBody": {"en": "Reach out and we'll get back to you within 48 hours.", "es": "Contáctanos y te responderemos en 48 horas.", "fr": "Contactez-nous et nous vous répondrons sous 48 heures.", "pt": "Entre em contato e responderemos em 48 horas.", "it": "Contattaci e ti risponderemo entro 48 ore.", "ja": "お問い合わせいただければ48時間以内に返信します。"},

    # Contact page
    "contactTag": {"en": "Contact", "es": "Contacto", "fr": "Contact", "pt": "Contato", "it": "Contatto", "ja": "お問い合わせ"},
    "contactEmailLabel": {"en": "Email", "es": "Correo", "fr": "Email", "pt": "E-mail", "it": "Email", "ja": "メール"},
    "contactPhoneLabel": {"en": "Phone", "es": "Teléfono", "fr": "Téléphone", "pt": "Telefone", "it": "Telefono", "ja": "電話"},
    "contactHoursLabel": {"en": "Hours", "es": "Horario", "fr": "Horaires", "pt": "Horário", "it": "Orari", "ja": "営業時間"},
    "contactHoursValue": {"en": "Mon–Fri, 8am–8pm EST", "es": "Lun–Vie, 8am–8pm EST", "fr": "Lun–Ven, 8h–20h EST", "pt": "Seg–Sex, 8h–20h EST", "it": "Lun–Ven, 8:00–20:00 EST", "ja": "月〜金 8:00〜20:00 EST"},
    "contactSocialLabel": {"en": "Follow us", "es": "Síguenos", "fr": "Suivez-nous", "pt": "Siga-nos", "it": "Seguici", "ja": "フォローする"},
    "mapPlaceholder": {"en": "Kazehana HQ — Global, remote-first", "es": "Kazehana HQ — Global, remoto primero", "fr": "Kazehana HQ — Mondial, remote-first", "pt": "Kazehana HQ — Global, remoto primeiro", "it": "Kazehana HQ — Globale, remote-first", "ja": "Kazehana HQ — グローバル、リモートファースト"},

    # About page
    "aboutTag": {"en": "About us", "es": "Nosotros", "fr": "À propos", "pt": "Sobre nós", "it": "Chi siamo", "ja": "会社概要"},
    "aboutTitle": {"en": "Built for hospitality operators, by hospitality operators.", "es": "Creado por hoteleros, para hoteleros.", "fr": "Conçu par des hôteliers, pour des hôteliers.", "pt": "Criado por hoteleiros, para hoteleiros.", "it": "Creato da albergatori, per albergatori.", "ja": "ホスピタリティのプロが、ホスピタリティのために。"},
    "aboutLead": {"en": "We believe great software should fade into the background so your team can focus on guests.", "es": "Creemos que el buen software debe desaparecer para que tu equipo se enfoque en los huéspedes.", "fr": "Nous croyons qu'un bon logiciel doit s'effacer pour que votre équipe se concentre sur les clients.", "pt": "Acreditamos que um bom software deve desaparecer para que sua equipe foque nos hóspedes.", "it": "Crediamo che un buon software debba scomparire per permettere al team di concentrarsi sugli ospiti.", "ja": "優れたソフトウェアは背景に溶け込み、チームがゲストに集中できるべきだと考えています。"},
    "aboutStoryTitle": {"en": "Our story", "es": "Nuestra historia", "fr": "Notre histoire", "pt": "Nossa história", "it": "La nostra storia", "ja": "私たちのストーリー"},
    "aboutStory1": {"en": "Kazehana started in a hotel lobby. Our founder — a former operations director — watched the front desk juggle five different systems just to check in a guest. Reservations in one tab, housekeeping in another, restaurant bookings on a paper clipboard.", "es": "Kazehana comenzó en el lobby de un hotel. Nuestro fundador vio cómo la recepción malabareaba cinco sistemas para registrar a un huésped.", "fr": "Kazehana est né dans le hall d'un hôtel. Notre fondateur a vu la réception jongler avec cinq systèmes différents pour enregistrer un client.", "pt": "Kazehana começou no lobby de um hotel. Nosso fundador viu a recepção fazendo malabarismos com cinco sistemas para registrar um hóspede.", "it": "Kazehana è nata nella hall di un hotel. Il nostro fondatore ha visto la reception destreggiarsi tra cinque sistemi per fare il check-in di un ospite.", "ja": "Kazehanaはホテルのロビーから始まりました。創業者は元オペレーションディレクターで、フロントデスクが1人のゲストをチェックインするために5つのシステムを操作する様子を目の当たりにしました。"},
    "aboutStory2": {"en": "We set out to build a single platform that connects every department. Today Kazehana serves over 200 properties across 14 countries, helping teams reduce check-in time by 60% and increase direct bookings by 35%.", "es": "Nos propusimos construir una plataforma única que conecte todos los departamentos. Hoy servimos a más de 200 propiedades en 14 países.", "fr": "Nous avons entrepris de créer une plateforme unique connectant tous les services. Aujourd'hui, nous servons plus de 200 établissements dans 14 pays.", "pt": "Nos propusemos a construir uma plataforma única que conecta todos os departamentos. Hoje servimos mais de 200 propriedades em 14 países.", "it": "Ci siamo proposti di costruire un'unica piattaforma che connette ogni reparto. Oggi serviamo oltre 200 strutture in 14 paesi.", "ja": "すべての部門をつなぐ単一プラットフォームの構築を目指しました。現在、14カ国200以上の施設で利用され、チェックイン時間60%短縮、直接予約35%増加を実現しています。"},
    "valuesTag": {"en": "Values", "es": "Valores", "fr": "Valeurs", "pt": "Valores", "it": "Valori", "ja": "価値観"},
    "valuesTitle": {"en": "What drives us.", "es": "Lo que nos impulsa.", "fr": "Ce qui nous anime.", "pt": "O que nos move.", "it": "Cosa ci guida.", "ja": "私たちの原動力。"},
    "value1Title": {"en": "Hospitality-first", "es": "Hospitalidad primero", "fr": "L'hospitalité d'abord", "pt": "Hospitalidade em primeiro lugar", "it": "Hospitality-first", "ja": "ホスピタリティ第一"},
    "value1Body": {"en": "Every feature we ship is measured by one question: does this help the guest feel cared for?", "es": "Cada función se mide con una pregunta: ¿esto ayuda a que el huésped se sienta cuidado?", "fr": "Chaque fonctionnalité est évaluée par une question : cela aide-t-il le client à se sentir bien pris en charge ?", "pt": "Cada funcionalidade é medida por uma pergunta: isso ajuda o hóspede a se sentir cuidado?", "it": "Ogni funzionalità è misurata da una domanda: aiuta l'ospite a sentirsi coccolato?", "ja": "すべての機能は「ゲストが大切にされていると感じられるか」という基準で評価します。"},
    "value2Title": {"en": "Radical simplicity", "es": "Simplicidad radical", "fr": "Simplicité radicale", "pt": "Simplicidade radical", "it": "Semplicità radicale", "ja": "徹底したシンプルさ"},
    "value2Body": {"en": "If a new team member can't learn it in a day, we redesign it. Complexity is a bug, not a feature.", "es": "Si un nuevo miembro del equipo no puede aprenderlo en un día, lo rediseñamos.", "fr": "Si un nouveau membre de l'équipe ne peut pas l'apprendre en un jour, nous le reconcevons.", "pt": "Se um novo membro da equipe não consegue aprender em um dia, redesenhamos.", "it": "Se un nuovo membro del team non può impararlo in un giorno, lo riprogettiamo.", "ja": "新しいチームメンバーが1日で習得できなければ、再設計します。複雑さはバグであり、機能ではありません。"},
    "value3Title": {"en": "Global mindset", "es": "Mentalidad global", "fr": "Esprit global", "pt": "Mentalidade global", "it": "Mentalità globale", "ja": "グローバルな視点"},
    "value3Body": {"en": "We serve properties from Cartagena to Osaka. Our platform speaks 6 languages natively.", "es": "Servimos propiedades desde Cartagena hasta Osaka. Nuestra plataforma habla 6 idiomas de forma nativa.", "fr": "Nous servons des établissements de Carthagène à Osaka. Notre plateforme parle 6 langues nativement.", "pt": "Servimos propriedades de Cartagena a Osaka. Nossa plataforma fala 6 idiomas nativamente.", "it": "Serviamo strutture da Cartagena a Osaka. La nostra piattaforma parla 6 lingue nativamente.", "ja": "カルタヘナから大阪まで、世界中の施設に対応。プラットフォームは6言語にネイティブ対応。"},
    "value4Title": {"en": "Trust by design", "es": "Confianza por diseño", "fr": "Confiance par conception", "pt": "Confiança por design", "it": "Fiducia by design", "ja": "設計段階からの信頼性"},
    "value4Body": {"en": "PCI DSS compliance, encryption at rest, and zero data-selling. Your data is yours, always.", "es": "Cumplimiento PCI DSS, encriptación en reposo y cero venta de datos. Sus datos son suyos.", "fr": "Conformité PCI DSS, chiffrement au repos et aucune vente de données. Vos données vous appartiennent.", "pt": "Conformidade PCI DSS, criptografia em repouso e zero venda de dados. Seus dados são seus.", "it": "Conformità PCI DSS, crittografia a riposo e zero vendita di dati. I tuoi dati sono tuoi, sempre.", "ja": "PCI DSS準拠、データ暗号化、データ販売ゼロ。お客様のデータは常にお客様のものです。"},
    "awardsTag": {"en": "Recognition", "es": "Reconocimiento", "fr": "Reconnaissance", "pt": "Reconhecimento", "it": "Riconoscimenti", "ja": "評価"},
    "awardsTitle": {"en": "Awarded for excellence.", "es": "Premiados por excelencia.", "fr": "Récompensés pour l'excellence.", "pt": "Premiados por excelência.", "it": "Premiati per l'eccellenza.", "ja": "卓越性が認められました。"},
    "award1Title": {"en": "Best PMS UX 2026", "es": "Mejor UX PMS 2026", "fr": "Meilleure UX PMS 2026", "pt": "Melhor UX PMS 2026", "it": "Miglior UX PMS 2026", "ja": "Best PMS UX 2026"},
    "award1Org": {"en": "HotelTechAwards", "es": "HotelTechAwards", "fr": "HotelTechAwards", "pt": "HotelTechAwards", "it": "HotelTechAwards", "ja": "HotelTechAwards"},
    "award2Title": {"en": "Top Rated 2025", "es": "Mejor valorado 2025", "fr": "Top Rated 2025", "pt": "Melhor avaliado 2025", "it": "Top Rated 2025", "ja": "Top Rated 2025"},
    "award2Org": {"en": "Capterra Shortlist", "es": "Capterra Shortlist", "fr": "Capterra Shortlist", "pt": "Capterra Shortlist", "it": "Capterra Shortlist", "ja": "Capterra Shortlist"},
    "award3Title": {"en": "Users Love Us", "es": "Los usuarios nos aman", "fr": "Les utilisateurs nous adorent", "pt": "Usuários nos amam", "it": "Gli utenti ci amano", "ja": "Users Love Us"},
    "award3Org": {"en": "G2", "es": "G2", "fr": "G2", "pt": "G2", "it": "G2", "ja": "G2"},
    "aboutCtaTitle": {"en": "Join 200+ properties.", "es": "Únete a más de 200 propiedades.", "fr": "Rejoignez plus de 200 établissements.", "pt": "Junte-se a mais de 200 propriedades.", "it": "Unisciti a oltre 200 strutture.", "ja": "200以上の施設に参加。"},
    "aboutCtaBody": {"en": "See what Kazehana can do for your team.", "es": "Vea lo que Kazehana puede hacer por su equipo.", "fr": "Voyez ce que Kazehana peut faire pour votre équipe.", "pt": "Veja o que a Kazehana pode fazer pela sua equipe.", "it": "Scopri cosa può fare Kazehana per il tuo team.", "ja": "Kazehanaがあなたのチームにできることをご覧ください。"},

    # Pricing page
    "pricingTag": {"en": "Pricing", "es": "Precios", "fr": "Tarifs", "pt": "Preços", "it": "Prezzi", "ja": "料金"},
    "pricingTitle": {"en": "Transparent pricing, tailored to your property.", "es": "Precios transparentes, adaptados a su propiedad.", "fr": "Tarifs transparents, adaptés à votre établissement.", "pt": "Preços transparentes, adaptados à sua propriedade.", "it": "Prezzi trasparenti, su misura per la tua struttura.", "ja": "施設に合わせた透明な料金体系。"},
    "pricingLead": {"en": "Choose the plan that fits your size and needs. Every tier includes core modules, support, and updates.", "es": "Elija el plan que se ajuste a su tamaño y necesidades. Cada nivel incluye módulos principales, soporte y actualizaciones.", "fr": "Choisissez le plan adapté à votre taille et à vos besoins. Chaque niveau inclut les modules de base, le support et les mises à jour.", "pt": "Escolha o plano ideal para seu tamanho e necessidades. Cada nível inclui módulos principais, suporte e atualizações.", "it": "Scegli il piano adatto alle tue dimensioni e necessità. Ogni livello include moduli core, supporto e aggiornamenti.", "ja": "規模とニーズに合ったプランを。すべてのティアにコアモジュール、サポート、アップデートが含まれます。"},
    "pricingStarterTitle": {"en": "Starter", "es": "Inicial", "fr": "Starter", "pt": "Inicial", "it": "Starter", "ja": "スターター"},
    "pricingStarterRange": {"en": "1–30 rooms", "es": "1–30 habitaciones", "fr": "1–30 chambres", "pt": "1–30 quartos", "it": "1–30 camere", "ja": "1〜30室"},
    "pricingStarterDesc": {"en": "For boutique hotels and independent properties getting started with a modern PMS.", "es": "Para hoteles boutique y propiedades independientes que comienzan con un PMS moderno.", "fr": "Pour les hôtels boutique et les établissements indépendants qui débutent avec un PMS moderne.", "pt": "Para hotéis boutique e propriedades independentes começando com um PMS moderno.", "it": "Per hotel boutique e strutture indipendenti che iniziano con un PMS moderno.", "ja": "最新PMSを導入するブティックホテルや独立系施設向け。"},
    "pricingGrowthTitle": {"en": "Growth", "es": "Crecimiento", "fr": "Croissance", "pt": "Crescimento", "it": "Crescita", "ja": "グロース"},
    "pricingGrowthRange": {"en": "30–100 rooms", "es": "30–100 habitaciones", "fr": "30–100 chambres", "pt": "30–100 quartos", "it": "30–100 camere", "ja": "30〜100室"},
    "pricingGrowthDesc": {"en": "For growing properties that need full operations, restaurant, and multi-department workflows.", "es": "Para propiedades en crecimiento que necesitan operaciones completas, restaurante y flujos multidepartamentales.", "fr": "Pour les établissements en croissance qui ont besoin d'opérations complètes, de restaurant et de flux multi-services.", "pt": "Para propriedades em crescimento que precisam de operações completas, restaurante e fluxos multidepartamentais.", "it": "Per strutture in crescita che necessitano di operazioni complete, ristorante e flussi multi-reparto.", "ja": "全業務、レストラン、複数部門ワークフローを必要とする成長施設向け。"},
    "pricingEnterpriseTitle": {"en": "Enterprise", "es": "Empresarial", "fr": "Enterprise", "pt": "Empresarial", "it": "Enterprise", "ja": "エンタープライズ"},
    "pricingEnterpriseRange": {"en": "100+ rooms", "es": "100+ habitaciones", "fr": "100+ chambres", "pt": "100+ quartos", "it": "100+ camere", "ja": "100室以上"},
    "pricingEnterpriseDesc": {"en": "For multi-property groups and chains that need advanced integrations and dedicated support.", "es": "Para grupos multipropiedad y cadenas que necesitan integraciones avanzadas y soporte dedicado.", "fr": "Pour les groupes multi-établissements et les chaînes qui ont besoin d'intégrations avancées et de support dédié.", "pt": "Para grupos multipropriedade e redes que precisam de integrações avançadas e suporte dedicado.", "it": "Per gruppi multi-struttura e catene che necessitano di integrazioni avanzate e supporto dedicato.", "ja": "高度な統合と専任サポートを必要とする複数施設グループやチェーン向け。"},
    "pricingCta": {"en": "Contact sales", "es": "Contactar ventas", "fr": "Contacter les ventes", "pt": "Contatar vendas", "it": "Contatta vendite", "ja": "営業に問い合わせる"},
    "pricingPopular": {"en": "Most popular", "es": "Más popular", "fr": "Le plus populaire", "pt": "Mais popular", "it": "Più popolare", "ja": "最も人気"},
    "compareTag": {"en": "Compare", "es": "Comparar", "fr": "Comparer", "pt": "Comparar", "it": "Confronta", "ja": "比較"},
    "compareTitle": {"en": "Feature comparison", "es": "Comparación de funciones", "fr": "Comparaison des fonctionnalités", "pt": "Comparação de recursos", "it": "Confronto funzionalità", "ja": "機能比較"},
    "compareFeature": {"en": "Feature", "es": "Función", "fr": "Fonctionnalité", "pt": "Recurso", "it": "Funzionalità", "ja": "機能"},
    "compareR1": {"en": "Front desk & reservations", "es": "Recepción y reservas", "fr": "Réception et réservations", "pt": "Recepção e reservas", "it": "Reception e prenotazioni", "ja": "フロントデスクと予約"},
    "compareR2": {"en": "E-invoicing", "es": "Facturación electrónica", "fr": "Facturation électronique", "pt": "Faturamento eletrônico", "it": "Fatturazione elettronica", "ja": "電子請求"},
    "compareR3": {"en": "Restaurant management", "es": "Gestión de restaurante", "fr": "Gestion du restaurant", "pt": "Gestão de restaurante", "it": "Gestione ristorante", "ja": "レストラン管理"},
    "compareR4": {"en": "Housekeeping", "es": "Limpieza", "fr": "Entretien ménager", "pt": "Limpeza", "it": "Pulizie", "ja": "ハウスキーピング"},
    "compareR5": {"en": "Accounting module", "es": "Módulo contable", "fr": "Module comptable", "pt": "Módulo contábil", "it": "Modulo contabilità", "ja": "会計モジュール"},
    "compareR6": {"en": "Channel Manager", "es": "Channel Manager", "fr": "Channel Manager", "pt": "Channel Manager", "it": "Channel Manager", "ja": "チャネルマネージャー"},
    "compareR7": {"en": "Multi-property", "es": "Multipropiedad", "fr": "Multi-établissements", "pt": "Multipropriedade", "it": "Multi-struttura", "ja": "複数施設管理"},
    "compareR8": {"en": "API access", "es": "Acceso API", "fr": "Accès API", "pt": "Acesso API", "it": "Accesso API", "ja": "APIアクセス"},
    "compareR9": {"en": "Support level", "es": "Nivel de soporte", "fr": "Niveau de support", "pt": "Nível de suporte", "it": "Livello di supporto", "ja": "サポートレベル"},
    "compareR10": {"en": "Dedicated success manager", "es": "Gerente de éxito dedicado", "fr": "Gestionnaire de succès dédié", "pt": "Gerente de sucesso dedicado", "it": "Success manager dedicato", "ja": "専任サクセスマネージャー"},
    "addonsTag": {"en": "Add-ons", "es": "Complementos", "fr": "Modules complémentaires", "pt": "Complementos", "it": "Add-on", "ja": "アドオン"},
    "addonsTitle": {"en": "Extend your platform.", "es": "Amplíe su plataforma.", "fr": "Étendez votre plateforme.", "pt": "Expanda sua plataforma.", "it": "Estendi la tua piattaforma.", "ja": "プラットフォームを拡張。"},
    "addonsLead": {"en": "Optional modules available on any plan.", "es": "Módulos opcionales disponibles en cualquier plan.", "fr": "Modules optionnels disponibles sur tous les plans.", "pt": "Módulos opcionais disponíveis em qualquer plano.", "it": "Moduli opzionali disponibili su qualsiasi piano.", "ja": "すべてのプランで利用可能なオプションモジュール。"},
    "addon1Title": {"en": "Channel Manager", "es": "Channel Manager", "fr": "Channel Manager", "pt": "Channel Manager", "it": "Channel Manager", "ja": "チャネルマネージャー"},
    "addon1Desc": {"en": "Real-time OTA sync with Booking.com, Expedia, Airbnb, and more.", "es": "Sincronización OTA en tiempo real con Booking.com, Expedia, Airbnb y más.", "fr": "Synchronisation OTA en temps réel avec Booking.com, Expedia, Airbnb et plus.", "pt": "Sincronização OTA em tempo real com Booking.com, Expedia, Airbnb e mais.", "it": "Sincronizzazione OTA in tempo reale con Booking.com, Expedia, Airbnb e altro.", "ja": "Booking.com、Expedia、AirbnbなどとのリアルタイムOTA同期。"},
    "addon2Title": {"en": "Revenue Management", "es": "Revenue Management", "fr": "Revenue Management", "pt": "Revenue Management", "it": "Revenue Management", "ja": "レベニューマネジメント"},
    "addon2Desc": {"en": "AI-powered pricing recommendations based on demand and competitor rates.", "es": "Recomendaciones de precios con IA basadas en la demanda y tarifas de la competencia.", "fr": "Recommandations tarifaires IA basées sur la demande et les tarifs des concurrents.", "pt": "Recomendações de preços com IA baseadas na demanda e tarifas dos concorrentes.", "it": "Raccomandazioni tariffarie AI basate sulla domanda e sulle tariffe dei concorrenti.", "ja": "需要と競合料金に基づくAI価格推奨。"},
    "addon3Title": {"en": "Guest Portal", "es": "Portal de huéspedes", "fr": "Portail client", "pt": "Portal do hóspede", "it": "Portale ospiti", "ja": "ゲストポータル"},
    "addon3Desc": {"en": "Self-service check-in, upsells, and digital key delivery for guests.", "es": "Check-in autoservicio, ventas adicionales y entrega de llave digital.", "fr": "Check-in libre-service, ventes additionnelles et remise de clé numérique.", "pt": "Check-in self-service, upsells e entrega de chave digital.", "it": "Check-in self-service, upsell e consegna chiave digitale.", "ja": "セルフチェックイン、アップセル、デジタルキー配信。"},
    "pricingCtaTitle": {"en": "Not sure which plan fits?", "es": "¿No está seguro de qué plan le conviene?", "fr": "Vous ne savez pas quel plan choisir ?", "pt": "Não tem certeza de qual plano se encaixa?", "it": "Non sai quale piano fa per te?", "ja": "どのプランが適しているか分かりませんか？"},
    "pricingCtaBody": {"en": "Let's talk. We'll help you choose the right tier based on your property size and goals.", "es": "Hablemos. Le ayudaremos a elegir el nivel adecuado según el tamaño y los objetivos de su propiedad.", "fr": "Parlons-en. Nous vous aiderons à choisir le bon niveau en fonction de la taille et des objectifs de votre établissement.", "pt": "Vamos conversar. Ajudaremos a escolher o nível certo com base no tamanho e objetivos da sua propriedade.", "it": "Parliamone. Ti aiuteremo a scegliere il livello giusto in base alle dimensioni e agli obiettivi della tua struttura.", "ja": "ご相談ください。施設の規模と目標に基づいて最適なティアをご提案します。"},
}

# Now update the file
# Find each language section and add missing keys
langs = ["en", "es", "fr", "pt", "it", "ja"]
for lang in langs:
    # Find the language section start
    lang_start_pattern = f"          {lang}: {{"
    idx = content.find(lang_start_pattern)
    if idx == -1:
        print(f"WARNING: Could not find language section: {lang}")
        continue
    # Find the closing brace for this language section
    # The next language starts with "          XX: {" or the file ends
    next_lang_idx = len(content)
    for other_lang in langs:
        if other_lang == lang:
            continue
        other_idx = content.find(f"          {other_lang}: {{", idx + len(lang_start_pattern))
        if other_idx != -1 and other_idx < next_lang_idx:
            next_lang_idx = other_idx

    # Extract the language section
    lang_section = content[idx:next_lang_idx]

    # Find the closing of this language object - last "}," before next section or end
    # Walk backwards from end to find the closing
    closing = lang_section.rstrip().rstrip(",")
    closing_idx = idx + len(closing)

    # Build new keys string for this language
    new_entries = []
    for key, translations in new_keys.items():
        # Check if key already exists in this language section
        if f"            {key}:" in lang_section:
            continue  # Skip existing keys
        value = translations.get(lang, translations.get("en", ""))
        # Escape any double quotes in the value
        value = value.replace('"', '\\"')
        new_entries.append(f'            {key}: "{value}",')

    if new_entries:
        # Insert before the closing of the language object
        insert_text = "\n" + "\n".join(new_entries) + "\n"
        insert_pos = closing_idx
        content = content[:insert_pos] + insert_text + content[insert_pos:]
        print(f"  {lang}: added {len(new_entries)} new keys")

# Also fix the existing "heroSecondary" key from "Explore workflow" to "Explore modules"
content = content.replace('"Explore workflow"', '"Explore modules"')
# Fix navTeams → we keep it but also have navModules now

with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nUpdated {FILE}")
print(f"New file size: {len(content)} bytes")
