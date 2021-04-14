import '../../../App.css';
import UserBoards from '../../Boards/User/user-boards'

import CardUserDashboard from '../../Cards/Card-user-dashboard/card-user-dashboard'

function UserView() {
  return (
    <div className="container">
      <div className="content">
        <div className="section">
          <div className="cards">
            <CardUserDashboard title="Number of Users" value="309" />
            <CardUserDashboard title="Number of Users" value="309" />
            <CardUserDashboard title="Number of Users" value="309" />
            <CardUserDashboard title="Number of Users" value="309" />
            <CardUserDashboard title="Number of Users" value="309" />
          </div>
          <UserBoards />
        </div>
      </div>
    </div>
  );
}

export default UserView;