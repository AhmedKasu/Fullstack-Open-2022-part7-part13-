import { TotalProps } from '../types';

const Total = (props: TotalProps): JSX.Element => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  );
};

export default Total;
