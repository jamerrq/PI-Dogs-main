import React from 'react';
import './styles.css';

// Icons
import { FaReact, FaHtml5, FaCss3, } from 'react-icons/fa';
import { SiRedux, SiJavascript, SiExpress, SiSequelize } from 'react-icons/si';
import { SiPostgresql, SiPostman } from 'react-icons/si';
import { TbBrandGithubCopilot } from 'react-icons/tb';


class Footer extends React.Component {
    render() {
        return (
            <footer>
                Web Api created by&nbsp;
                <a href="https://github.com/jamerrq">
                    @jamerrq
                </a>&nbsp;using&nbsp;
                <FaReact />&nbsp;
                <FaHtml5 />&nbsp;
                <FaCss3 />&nbsp;
                <SiRedux />&nbsp;
                <SiJavascript />&nbsp;
                <SiExpress />&nbsp;
                <SiSequelize />&nbsp;
                <SiPostgresql />&nbsp;
                <TbBrandGithubCopilot />&nbsp;
                <SiPostman />&nbsp;
            </footer>
        );
    };
};


export default Footer;
