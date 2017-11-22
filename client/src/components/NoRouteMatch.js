import React from 'react';
import { Link } from 'react-router-dom';

const NoRouteMatchComponent = ({ location }) => (
    <div>
      <blockquote className="blockquote">
        <h3 className="mb-0">
          No match for <code>{location.pathname}</code>.
        </h3>
        <footer className="blockquote-footer">
          <small>
            <Link to="/">Back to Home</Link>
          </small>
        </footer>
      </blockquote>
    </div>
);

export default NoRouteMatchComponent;