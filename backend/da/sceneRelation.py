from characters import characters
from script_sections import scene_contents
import networkx as nx
import matplotlib.pyplot as plt

graph = nx.Graph()
for scene in scene_contents : 
    for i in range(len(scene[1])) : # 각 씬의 문장 개수만큼 반복
        for j in range(len(scene[1])) :
            if j>i :
                continue
            for char1 in characters :
                if char1 in scene[1][i] :
                    for char2 in characters :
                        if char2 in scene[1][j] :
                            if char1 == char2 :
                                continue
                            if not graph.has_edge(char1, char2) :
                                graph.add_edge(char1, char2, weight=0.001)
                            else:
                                graph[char1][char2]['weight'] += 0.001
    
edge_weights = [graph[u][v]['weight'] for u,v in graph.edges()]
pos = nx.spectral_layout(graph)
plt.figure(figsize=(13,13))
nx.draw_networkx(graph, with_labels=True, width=edge_weights, alpha=0.7)
plt.show()