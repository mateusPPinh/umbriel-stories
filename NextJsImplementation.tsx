import _ from "lodash";
import { memo, ReactNode, Suspense, useMemo } from "react";
import { NextSeo } from "next-seo";
import { PageBlockV2 as PageBlock, ClientTheme } from "@umbriel/components";
import { useTenant } from "../hooks/useTenant";
import { useTheme } from "../hooks/useTheme";
import { TenantProvider } from "../contexts/TenantContext";
import { AppLayoutProvider } from "../contexts/AppLayoutContext";
import { transformBlock } from "../utils/transformBlock";

// Types
import type { PageType, MenuDataProps, Editorial, TenantConfig, PageBlockType } from "../types";

// Loading component for Suspense
const LoadingBlock = () => (
  <div className="w-full h-32 animate-pulse bg-gray-200 dark:bg-gray-800 rounded" />
);

type HomeProps = {
  pageData: PageType;
  children: ReactNode;
  menu: MenuDataProps;
  editorialProps: Editorial;
  clientSettingsData: TenantConfig;
  siteData: PageBlockType[];
  currentPageTitle: string;
  currentPageDescription: string;
  currentPageKeywords: string;
  currentPageSlug: string;
};

interface BlockProps {
  block: any;
  isDarkTheme: boolean;
  clientSettingsData: any;
}

const Block = memo<BlockProps>(({ block, isDarkTheme, clientSettingsData }) => {
  // Formatar os dados do cliente para o formato esperado pelo PageBlockV2
  const clientGeneralSettingsData = useMemo<ClientTheme>(() => {
    return {
      fontMapping: {
        pageblockTitle: clientSettingsData?.fontMapping?.pageblockTitle || "system-ui",
        pageblockSubtitle: clientSettingsData?.fontMapping?.pageblockSubtitle || "system-ui",
        pageblockText: clientSettingsData?.fontMapping?.pageblockText || "system-ui"
      },
      colorMapping: {
        light: {
          pageblockTitle: clientSettingsData?.colorMapping?.light?.pageblockTitle || "#1A1A1A",
          pageblockSubtitle: clientSettingsData?.colorMapping?.light?.pageblockSubtitle || "#4A5568",
          pageblockText: clientSettingsData?.colorMapping?.light?.pageblockText || "#4A5568"
        },
        dark: {
          pageblockTitle: clientSettingsData?.colorMapping?.dark?.pageblockTitle || "#FFFFFF",
          pageblockSubtitle: clientSettingsData?.colorMapping?.dark?.pageblockSubtitle || "#E2E8F0",
          pageblockText: clientSettingsData?.colorMapping?.dark?.pageblockText || "#A0AEC0"
        }
      },
      fontSize: {
        // Extrair os tamanhos de fonte do desktop como padrão
        pageblockTitle: clientSettingsData?.fontMapping?.fontSizeBySession?.desktop?.pageblockTitle || "1.5rem",
        pageblockSubtitle: clientSettingsData?.fontMapping?.fontSizeBySession?.desktop?.pageblockSubtitle || "1.125rem",
        pageblockText: clientSettingsData?.fontMapping?.fontSizeBySession?.desktop?.pageblockText || "1rem"
      }
    };
  }, [clientSettingsData]);

  return (
    <Suspense fallback={<LoadingBlock />}>
      <PageBlock
        blocksData={[block]}
        isDarkTheme={isDarkTheme}
        clientGeneralSettingsData={clientGeneralSettingsData}
      />
    </Suspense>
  );
});

Block.displayName = 'Block';

const Home = memo<HomeProps>(({
  pageData,
  children,
  menu,
  editorialProps,
  clientSettingsData,
  siteData,
  currentPageTitle,
  currentPageDescription,
  currentPageKeywords,
  currentPageSlug,
}: HomeProps) => {
  const { config: tenantConfig } = useTenant();
  const { theme } = useTheme();

  const transformedBlocks = useMemo(() => 
    siteData.map(block => transformBlock(block, tenantConfig?.id || "")),
    [siteData, tenantConfig?.id]
  );

  const isDarkTheme = useMemo(() => 
    theme === 'dark', // Assumindo que theme é 'dark' ou 'light'
    [theme]
  );

  return (
    <TenantProvider>
      <AppLayoutProvider
        pageData={pageData}
        menuDataProps={menu}
      >
        <NextSeo
          title={currentPageTitle}
          description={currentPageDescription}
          openGraph={{
            title: currentPageTitle,
            description: currentPageDescription
          }}
        />
        <div className="w-full h-full mt-60">
          {transformedBlocks.map((block) => (
            <Block
              key={block.id}
              block={block}
              isDarkTheme={isDarkTheme}
              clientSettingsData={clientSettingsData}
            />
          ))}
        </div>
      </AppLayoutProvider>
    </TenantProvider>
  );
});

Home.displayName = 'Home';

export default Home; 