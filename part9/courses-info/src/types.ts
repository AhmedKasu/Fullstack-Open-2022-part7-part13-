export interface HeaderProps {
  courseName: string;
}

export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface CourseParts {
  courseParts: CoursePart[];
}

export interface TotalProps {
  total: number;
}
