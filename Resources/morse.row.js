module.exports = function(text) {
    var row = Ti.UI.createTableViewRow({
        width : Ti.UI.SIZE,
        itemId : text

    });
    var views = [Ti.UI.createView({
        backgroundColor : 'orange'
    }), Ti.UI.createView()];
    row.add(Ti.UI.createScrollableView({
        views : views,
        height : 80,
    }));
    row.children[0].views[0].add(Ti.UI.createLabel({
        top : 10,
        left : 10,
        text : text,
        width : Ti.UI.FILL,
        textAlign : 'left',
        color : '#ff9',
        font : {
            fontSize : 32,
            fontFamily : 'Sigward'
        }
    }));
    row.children[0].views[1].add(Ti.UI.createLabel({
        top : 5,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        textAlign : 'left',
        left : 10,
        text : text,
        color : 'white',
        font : {
            fontSize : 100,
            fontFamily : 'Morse Code'
        }
    }));
    return row;
};
