import About from "../Components/About/About";
import Projects from "../Components/Projects/Projects";
import Terminal from "../Components/Terminal/Terminal";
import Settings from "../Components/Settings/Settings";
import Journey from "../Components/Journey/Journey";
import Achievements from "../Components/Achievements/Achievements";
import Certificates from "../Components/Certificates/Certificates";

export const appRegistry = {
    about: {
        id: "about",
        title: "About",
        icon: "👤",
        component: About,
    },
    projects: {
        id: "projects",
        title: "Projects",
        icon: "📁",
        component: Projects,
    },
    terminal: {
        id: "terminal",
        title: "Terminal",
        icon: "💻",
        component: Terminal,
    },
    settings: {
        id: "settings",
        title: "Settings",
        icon: "⚙️",
        component: Settings,
    },
    journey: {
        id: "journey",
        title: "Journey",
        icon: "📈",
        component: Journey,
    },
    achievements: {
        id: "achievements",
        title: "Achievements",
        icon: "🏆",
        component: Achievements,
    },
    certificates: {
        id: "certificates",
        title: "Certificates",
        icon: "📜",
        component: Certificates,
    },
};