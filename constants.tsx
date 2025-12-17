
import { FileEntry } from './types';

export const SYSTEM_FILES: FileEntry[] = [
    {
        name: 'C:',
        type: 'folder',
        children: [
            {
                name: 'Windows',
                type: 'folder',
                children: [
                    {
                        name: 'System32',
                        type: 'folder',
                        children: [
                            { name: 'kernel32.dll', type: 'file', size: '4.2 MB' },
                            { name: 'user32.dll', type: 'file', size: '2.1 MB' },
                            { name: 'gdi32.dll', type: 'file', size: '1.8 MB' },
                            { name: 'shell32.dll', type: 'file', size: '12.5 MB' },
                            { name: 'powder_core.exe', type: 'file', size: '512 KB' },
                        ]
                    },
                    { name: 'Boot', type: 'folder', children: [] },
                    { name: 'Web', type: 'folder', children: [] },
                ]
            },
            {
                name: 'Users',
                type: 'folder',
                children: [
                    {
                        name: 'Admin',
                        type: 'folder',
                        children: [
                            { 
                                name: 'Documents', 
                                type: 'folder', 
                                children: [
                                    { name: 'resume.pdf', type: 'file', size: '150 KB' },
                                    { name: 'todo_list.txt', type: 'file', size: '1 KB' },
                                    { name: 'budget_2024.xlsx', type: 'file', size: '45 KB' }
                                ] 
                            },
                            { name: 'Downloads', type: 'folder', children: [
                                { name: 'installer.exe', type: 'file', size: '25 MB' },
                                { name: 'archive.zip', type: 'file', size: '10 MB' }
                            ] },
                            { 
                                name: 'Pictures', 
                                type: 'folder', 
                                children: [
                                    { name: 'wallpaper.jpg', type: 'file', size: '2.1 MB' },
                                    { name: 'screenshot.png', type: 'file', size: '800 KB' },
                                    { name: 'vacation.gif', type: 'file', size: '4.5 MB' }
                                ] 
                            },
                        ]
                    }
                ]
            },
            {
                name: 'Program Files',
                type: 'folder',
                children: []
            }
        ]
    }
];

export const APP_CONFIGS = {
    explorer: { title: 'Computer', icon: 'fa-hard-drive' },
    search: { title: 'Powder Web', icon: 'fa-magnifying-glass' },
    camera: { title: 'Camera', icon: 'fa-camera' },
    calc: { title: 'Calculator', icon: 'fa-calculator' },
    control: { title: 'Control Panel', icon: 'fa-sliders' },
    games: { title: 'Games', icon: 'fa-gamepad' },
    appstore: { title: 'App Store', icon: 'fa-store' },
    creativecloud: { title: 'Creative Cloud', icon: 'fa-cloud' },
    discord: { title: 'Discord', icon: 'fa-comments' },
    dropbox: { title: 'Dropbox', icon: 'fa-box-archive' },
    dictionary: { title: 'Dictionary', icon: 'fa-book' },
    coteditor: { title: 'Cot Editor', icon: 'fa-code' },
    adium: { title: 'Adium', icon: 'fa-duck' },
    personalization: { title: 'Personalization', icon: 'fa-palette' },
};
