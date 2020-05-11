import React from 'react';

const Section = (props: any) => (
    <div className="section">
        <div className="header">{props.header}</div>
        <div>{props.children}</div>
    </div>
);

export default Section;
