import Part from './Part';
import { ContentProps } from '../types';

const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <div id='course-content' key={courseParts.indexOf(coursePart)}>
          <Part coursePart={coursePart} />
        </div>
      ))}
    </div>
  );
};

export default Content;
