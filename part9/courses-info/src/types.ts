export interface HeaderProps {
  courseName: string;
}
export interface TotalProps {
  total: number;
}
export interface ContentProps {
  courseParts: CoursePart[];
}

export interface PartProps {
  coursePart: CoursePart;
}
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface RequireDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends RequireDescription {
  type: 'normal';
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}
interface CourseSubmissionPart extends RequireDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends RequireDescription {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
