
export type AppID = 'explorer' | 'search' | 'camera' | 'calc' | 'control' | 'games' | 'appstore' | 'creativecloud' | 'discord' | 'dropbox' | 'dictionary' | 'coteditor' | 'adium' | 'personalization';

export interface WindowState {
    id: AppID;
    title: string;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    icon: string;
}

export interface FileEntry {
    name: string;
    type: 'file' | 'folder';
    size?: string;
    content?: string;
    children?: FileEntry[];
}
