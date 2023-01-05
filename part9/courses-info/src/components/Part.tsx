import { PartProps } from '../types';
import assertNever from '../utils/part-helper';

const Part = ({ coursePart }: PartProps): JSX.Element => {
  const renderPart = () => {
    switch (coursePart.type) {
      case 'normal':
        return (
          <>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
          </>
        );
      case 'groupProject':
        return (
          <>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>Group Project: {coursePart.groupProjectCount}</p>
          </>
        );

      case 'submission':
        return (
          <>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
            <p>
              Submission Link:{' '}
              <a href={coursePart.exerciseSubmissionLink}>
                {coursePart.exerciseSubmissionLink}
              </a>
            </p>
          </>
        );

      case 'special':
        return (
          <>
            <h2>
              {coursePart.name} {coursePart.exerciseCount}
            </h2>
            <p>{coursePart.description}</p>
            <p>Requirements: {coursePart.requirements.join(', ')}</p>
          </>
        );

      default:
        return assertNever(coursePart);
    }
  };

  return <div>{renderPart()}</div>;
};

export default Part;
