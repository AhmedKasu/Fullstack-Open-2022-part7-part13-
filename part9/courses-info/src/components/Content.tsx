import { CourseParts } from '../types';

const Content = ({ courseParts }: CourseParts): JSX.Element => {
  return (
    <div>
      {courseParts.map((part) => (
        <p key={courseParts.indexOf(part)}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
