import React, { Component } from "react";
import NotesContext from "../../contexts/NotesContext";
import Note from "../Note/Note";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Checklist from "../../components/Checklist/Checklist";
import { Button, Section } from "../../components/Utils/Utils";
import Footer from "../../components/Footer/Footer";
import WalkedChecklist from "../../components/Checklist/WalkedChecklist";
import "./ViewNotes.css";

export default class ViewNotes extends Component {
  state = {
    notes: []
  };

  static contextType = NotesContext;

  createList(notes) {
    return notes.map((note, i) => <Note note={note} key={i} />);
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <section className="homeBannerBackground">
          <h2 className="welcomeBanner">Welcome back {this.context.user}!</h2>
        </section>

        {/* <div className="checklist-container">
          <WalkedChecklist />
          <Checklist />
        </div> */}

        <Section className="importantNotes">
          <header>
            <h3>Note Vault</h3>
          </header>
          <ul className="notesList">{this.createList(this.context.notes)}</ul>
          <Link to="/add-note">
            <Button className="addNotesFolder">
              <i className="fas fa-folder-plus fa-3x" />
            </Button>
          </Link>
        </Section>
        <Footer />
      </React.Fragment>
    );
  }
}
