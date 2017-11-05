import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div className="form-group">
            <label className="cols-sm-2 control-label">{label}</label>
            <div className="cols-sm-10">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <input type="text" className="form-control" />
                </div>
            </div>
        </div>
    );
};