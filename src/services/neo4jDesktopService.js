/* global neo4jDesktopApi */

export default (store) => {

    const decorateContextWithActiveProject = (context) => {
      const activeProject = context.projects.find((project) => {
        var foundActiveGraph = false;
        project.graphs.forEach((graph) => {
          if (graph.status === "ACTIVE") {
            project.activeGraph = graph;
            foundActiveGraph = true;
          }
        });
        return foundActiveGraph;
      });
      context.activeProject = activeProject;
      return context;
    };

    store.dispatch({
        type: 'API_VERSION',
        version: neo4jDesktopApi.version
    });

    neo4jDesktopApi.onContextUpdate((event, newContext, oldContext) => {
        console.log("Desktop Event: ", event);

        store.dispatch({
            type: 'CONTEXT_UPDATE',
            event: event,
            context: decorateContextWithActiveProject(newContext)
        });
    });

    neo4jDesktopApi.getContext()
        .then(context => {
            store.dispatch({
                type: 'CONTEXT_UPDATE',
                context: decorateContextWithActiveProject(context)
            });
        })
}
