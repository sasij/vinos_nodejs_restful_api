
        <script id="vinoTemplate" type="text/template">
            <div class="img_wine">
                <img src="<%= targetPath %>" class="img-rounded">
                <%if( puntuacion == 1){%>
                    <span class="rating-static rating-10"></span>
                <%}else if(puntuacion == 2){%>
                    <span class="rating-static rating-20"></span>
                <%}else if(puntuacion == 3){%>
                    <span class="rating-static rating-30"></span>
                <%}else if(puntuacion == 4){%>
                    <span class="rating-static rating-40"></span>
                <%}else if(puntuacion == 5){%>
                    <span class="rating-static rating-50"></span>
                <%}else{%>
                    <span class="rating-static rating-0"></span>
                <%}%>
            </div>

            <div class="info_wine">
                <ul>
                    <li><strong class="nombre_vino">"<%= nombre %>"</strong></li>
                    <li><strong>D.O:</strong> "<%= denominacionOrigen %>"</li>
                    <li><strong>Tipo:</strong> "<%= color %>"</li>
                    <li><strong>Año:</strong> "<%= anyo %>"</li>
                    <li><strong>Precio:</strong> "<%= precio %>"</li>
                    <li><strong>Cata:</strong> "<%= cata %>" </li>
                </ul>
            </div>
        </script>