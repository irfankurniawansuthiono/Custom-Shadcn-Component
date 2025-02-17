import { routesList } from "@/app/routes";
import {
  BookUp2,
  ChartNoAxesGantt,
  Cpu,
  FileArchive,
  FileBadge2,
  FlaskConical,
  FolderGit2,
  MessageSquareMore,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";

enum projectsType {
  portfolio = "Portfolio",
}
type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export type NavGroup = {
  title: string;
  id: string;
  items: NavItem[];
  icon?: LucideIcon;
};

type NavConfig = {
  name: string;
  navigation: NavGroup[];
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export type projectsDataType = {
  title: string;
  category: string;
  url: string;
  img: string;
}[];
export const projects: projectsDataType = [
  {
    title: "PixelFolio",
    category: projectsType.portfolio,
    url: routesList.pixelfolio.dashboard,
    img: "/images/projects/pixelfolio.webp",
  },
];
const navConfig: Record<string, NavConfig> = {
  pixelfolio: {
    name: "PixelFolio",
    navigation: [
      {
        title: "Manage Apps",
        id: "apps",
        icon: ChartNoAxesGantt,
        items: [
          {
            icon: Cpu,
            title: "TechStack",
            url: routesList.pixelfolio.manage.apps.techStack,
          },
          {
            icon: BookUp2,
            title: "OtherSkills",
            url: routesList.pixelfolio.manage.apps.otherSkills,
          },
          {
            icon: FlaskConical,
            title: "Experience",
            url: routesList.pixelfolio.manage.apps.experience,
          },
          {
            icon: FileBadge2,
            title: "Certificates",
            url: routesList.pixelfolio.manage.apps.certificates,
          },
          {
            icon: FolderGit2,
            title: "Projects",
            url: routesList.pixelfolio.manage.apps.projects,
          },
        ],
      },
      {
        title: "Manage Dialogs",
        id: "dialogs",
        icon: MessageSquareMore,
        items: [
          {
            icon: MessageSquareText,
            title: "About",
            url: routesList.pixelfolio.manage.dialogs.about,
          },
          {
            icon: MessageSquareText,
            title: "Stages",
            url: routesList.pixelfolio.manage.dialogs.stages,
          },
          {
            icon: MessageSquareText,
            title: "Achievements",
            url: routesList.pixelfolio.manage.dialogs.achievements,
          },
        ],
      },
      {
        title: "Manage Defaults",
        id: "defaults",
        icon: FileArchive,
        items: [
          {
            icon: FileArchive,
            title: "ProjectsDefaults",
            url: routesList.pixelfolio.manage.defaults.project,
          },
        ],
      },
    ],
  },
};

export default navConfig;
