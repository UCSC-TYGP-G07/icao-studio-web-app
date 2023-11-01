const ICAOGuidelines: ICAOGuideLine[] = [
    {id: 'ICAO-1', guidelineNum: 1, title: 'Eye Location Accuracy', category: 'Feature Extraction Accuracy Tests'},
    {id: 'ICAO-2', guidelineNum: 2, title: 'Face Location Accuracy', category: 'Feature Extraction Accuracy Tests'},
    {id: 'ICAO-3', guidelineNum: 3, title: 'Eye Distance', category: 'Geometric Tests(Full Frontal Image Format)'},
    {id: 'ICAO-4', guidelineNum: 4, title: 'Vertical Position', category: 'Geometric Tests(Full Frontal Image Format)'},
    {id: 'ICAO-5', guidelineNum: 5, title: 'Horizontal Position', category: 'Geometric Tests(Full Frontal Image Format)'},
    {id: 'ICAO-6', guidelineNum: 6, title: 'Head Image Width Ratio', category: 'Geometric Tests(Full Frontal Image Format)'},
    {id: 'ICAO-7', guidelineNum: 7, title: 'Head Image Height Ratio', category: 'Geometric Tests(Full Frontal Image Format)'},
    {id: 'ICAO-8', guidelineNum: 8, title: 'Blurred', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-9', guidelineNum: 9, title: 'Looking Away', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-10', guidelineNum: 10, title: 'Ink Marked/Creased', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-11', guidelineNum: 11, title: 'Unnatural Skin Tone', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-12', guidelineNum: 12, title: 'Too Dark/Light', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-13', guidelineNum: 13, title: 'Washed Out', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-14', guidelineNum: 14, title: 'Pixelation', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-15', guidelineNum: 15, title: 'Hair Across Eyes', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-16', guidelineNum: 16, title: 'Eyes Closed', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-17', guidelineNum: 17, title: 'Varied Background', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-18', guidelineNum: 18, title: 'Roll/Pitch/Yaw Greater than 8°', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-19', guidelineNum: 19, title: 'Flash Reflection on Skin', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-20', guidelineNum: 20, title: 'Red Eyes', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-21', guidelineNum: 21, title: 'Shadows Behind Head', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-22', guidelineNum: 22, title: 'Shadows Across Face', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-23', guidelineNum: 23, title: 'Dark Tinted Lenses', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-24', guidelineNum: 24, title: 'Flash Reflection on Lenses', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-25', guidelineNum: 25, title: 'Frames too Heavy', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-26', guidelineNum: 26, title: 'Frame Covering Eyes', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-27', guidelineNum: 27, title: 'Hat/Cap', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-28', guidelineNum: 28, title: 'Veil over Face', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-29', guidelineNum: 29, title: 'Mouth Open', category: 'Photographic and Pose-Specific Tests'},
    {id: 'ICAO-30', guidelineNum: 30, title: 'Presence of Other Faces or Toys too Close to Face', category: 'Photographic and Pose-Specific Tests'},
];

export interface ICAOGuideLine{
    id: string;
    guidelineNum: number;
    title: string;
    category: string;
    description?: string;
    validity?: boolean;
    icaoCompScore?: number;
}

export default ICAOGuidelines;