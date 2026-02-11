import React from 'react';
import { Link } from 'react-router-dom';

import GraphImage from '../assets/graph-image.png';
import Section from './Section';

const HomePage = () => {
    return (
        <div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 col-md-7 my-auto">
                        <h1>Welcome to Graph Coverage</h1>
                        <p className="lead">
                            Explore the different paths and coverages provided by your graph algorithms.
                        </p>
                        <Link to="/generate" className="btn btn-primary btn-lg">
                            Get Started
                        </Link>
                    </div>
                    <div className="col-12 col-md-5">
                        <img src={GraphImage} alt="Graph Visualization" className="img-fluid mb-3" />
                    </div>
                </div>
            </div>
            <div>
            <div className="container my-5"> 
                <div className="d-flex justify-content-center">
                    
                    <div className="row mt-5 text-center g-3 px-1 card-row">
                        <div className="col-md-4 d-flex align-items-stretch">
                            <Section
                                header="What is node coverage?"
                                description="Node coverage ensures that each line of code in the program has been executed at least once during testing, helping to identify untested code segments."
                                headerClass="card-header-color"
                                descriptionClass="card-description-color"
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-stretch">
                            <Section
                                header="What is edge coverage?"
                                description="Edge coverage ensures that all possible paths through the code, including branches, loops, and conditional statements are executed."
                                headerClass="card-header-color"
                                descriptionClass="card-description-color"
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-stretch">
                            <Section
                                header="What is edge-pair coverage?"
                                description="It ensures that all pairs of edges between nodes in the code are executed. This helps to uncover potential dependencies between different parts of the code that are not revealed when testing individual edges separately."
                                headerClass="card-header-color"
                                descriptionClass="card-description-color"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    );
};

export default HomePage;
