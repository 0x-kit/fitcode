import React, { Component } from "react";
import {
    Header,
    Modal,
    Statistic,
    Button,
    Card
} from "semantic-ui-react";

import _ from "lodash";

import utils from "app/food/HomeUtils";

class AddRecipe extends Component {

    handleClose = () => {
        this.props.handleModal(false);
    };

    onSubmit = () => {
        const { selectedMeal, selectedRecipe } = this.props;
        console.log(selectedRecipe)
        console.log(selectedMeal)
        //this.props.complexAddDiaryRecipe(selectedMeal.mealId, selectedRecipe);
        this.handleClose();
    };

    renderMacros = (macrosPerRecipe) => {
        const { calories, proteins, carbs, fats } = macrosPerRecipe;
        const labels = ["Calories", "Proteins", "Carbs", "Fats"];
        const terms = [calories, proteins, carbs, fats];

        const renderStatistic = (label, term, index) => (
            <Statistic
                key={index}
                value={label}
                label={term}
            />
        );
        return (
            <Card.Group centered>
                <Statistic.Group className="prueba">
                    {labels.map((label, index) => {
                        return renderStatistic(label, terms[index], index);
                    })}
                </Statistic.Group>
            </Card.Group>
        );
    };

    render() {
        const { selectedRecipe, openModal } = this.props;
        const macrosPerRecipe = utils.macrosPerMeal(selectedRecipe);
        const buttonStyle = { marginBottom: 10, width: 272 };
        const modalStyle = { width: 300, textAlign: "center" };

        return (
            <Modal
                style={modalStyle}
                open={openModal}
                onClose={this.handleClose}
                size="mini"
            >
                <Header subheader={selectedRecipe.name} content="Add Recipe" />
                <Modal.Content>
                    {this.renderMacros(macrosPerRecipe)}
                </Modal.Content>
                <Modal.Actions>

                    <Button
                        style={buttonStyle}
                        size="small"
                        compact
                        secondary
                        content="Add"
                        floated="right"
                        onClick={() => { this.onSubmit() }}
                    />
                </Modal.Actions>
            </Modal>
        );
    }
}

export default AddRecipe;
