from places import place_characters
from characters import characters
import networkx as nx
import matplotlib.pyplot as plt

graph = nx.Graph()
for tuples in place_characters :
    for char in tuples[1] :
        for i in range(len(tuples[1])) :
            char1 = tuples[1][i][0]
            for j in range(len(tuples[1])) :
                char2 = tuples[1][j][0]
                if char1 == char2 :
                    continue
                if not graph.has_edge(char1, char2) :
                    graph.add_edge(char1, char2, weight=0.01)
                else:
                    graph[char1][char2]['weight'] += 0.01

edge_weights = [graph[u][v]['weight'] for u,v in graph.edges()]
pos = nx.spectral_layout(graph)
plt.figure(figsize=(15,15))
nx.draw_networkx(graph, with_labels=True, width=edge_weights, alpha=0.7)
plt.show()