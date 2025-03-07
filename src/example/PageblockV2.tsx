import { ReactElement } from "react";
import PageBlockV2 from '../components/PageblockV2/index';
import { blocks } from '../blocos.mock';

const App = (): ReactElement => {
  const clientGeneralSettingsData = {
    fontMapping: {
      articleTitle: "'DM Sans Variable', sans-serif",
      articleSubtitle: "'DM Sans Variable', sans-serif",
      articleBody: "'DM Sans Variable', sans-serif",
      headerTitle: "'DM Sans Variable', sans-serif",
      headerText: "'DM Sans Variable', sans-serif"
    },
    colorMapping: {
      light: {
        articleBackground: "#ffffff",
        articleTitle: "#000",
        articleSubtitle: "#4a5568",
        articleText: "#2d3748",
        headerBackground: "#ffffff",
        headerText: "#1a1a1a",
        primaryButton: "#2d3748",
        secondaryButton: "#4a5568",
        accent: "#3182ce",
        sidebarBackground: "#f7fafc",
        sidebarText: "#2d3748"
      },
      dark: {
        articleBackground: "#1a1a1a",
        articleTitle: "#ffffff",
        articleSubtitle: "#333",
        articleText: "#e2e8f0",
        headerBackground: "#1a1a1a",
        headerText: "#ffffff",
        primaryButton: "#e2e8f0",
        secondaryButton: "#a0aec0",
        accent: "#63b3ed",
        sidebarBackground: "#2d3748",
        sidebarText: "#e2e8f0"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 max-w-[1100px] mx-auto">
      <PageBlockV2 
        blocksData={blocks}
        isDarkTheme={false}
        clientGeneralSettingsData={clientGeneralSettingsData}
      />
    </div>
  );
};

export default App;