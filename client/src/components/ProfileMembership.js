import React from 'react';

const ProfileMembership = () => {
  return (
    <div className="tab-pane fade active show">
      <div className="card-body pb-2">
        <div className="form-group">
          <label className="form-label">Registered membership package</label>
          <input type="text" className="form-control" readOnly/>
        </div>
        <div className="form-group">
          <label className="form-label">Remaining days</label>
          <input type="text" className="form-control" readOnly/>
        </div>
        <div className="form-group">
          <label className="form-label">Remaining kg</label>
          <input type="text" className="form-control" readOnly/>
        </div>
      </div>
    </div>
  );
};

export default ProfileMembership;