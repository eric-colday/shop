import "./sidebar.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArticleIcon from '@mui/icons-material/Article';
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Tableau de bord</h3>
          <ul className="sidebarList">
            <NavLink to="/" className="link">
              <li className="sidebarListItem">
                <LineStyleIcon className="sidebarIcon" /> 
                Accueil
              </li>
            </NavLink>
            <NavLink to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentityIcon className="sidebarIcon" />
                Utilisateurs
              </li>
            </NavLink>
            <NavLink to="/products" className="link">
              <li className="sidebarListItem">
                <StorefrontIcon className="sidebarIcon" />
                Produits
              </li>
            </NavLink>
            <NavLink to="/articles" className="link">
              <li className="sidebarListItem">
                <ArticleIcon className="sidebarIcon" />
                Articles
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}
